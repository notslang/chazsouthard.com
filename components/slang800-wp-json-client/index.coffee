jsonp = require 'jsonp'
_ = require 'underscore'
Backbone = require 'backbone'
require 'backbone-associations'
Backbone.LocalStorage = require 'Backbone.localStorage'

map = (fids, type) ->
  type = if type instanceof Backbone.Collection then type.model else type
  for name, collection of API.cache
    if collection.model is type
      return collection.add(fids, merge: true)

  console.log fids, type
  throw '`type` didn\'t match the models of any collections'


class ContentObject extends Backbone.AssociatedModel
  defaultFields: []

  ###*
   * Fields that are always ignored
   * @type {Array}
  ###
  ignoredFields: []

  ###*
   * Determine what fields we don't have (minus those that we are ignoring)
   * @return {Array} list of fields
  ###
  getMissingFields: ->
    _.difference @defaultFields, @ignoredFields, @keys()


class Category extends ContentObject
  defaultFields: [
    'id'
    'slug'
    'title'
    'description'
    'parent'
    'post_count'
  ]


class Tag extends ContentObject
  defaultFields: [
    'id'
    'slug'
    'title'
    'description'
    'post_count'
  ]


class Author extends ContentObject
  defaultFields: [
    'id'
    'url'
    'slug'
    'name'
    'first_name'
    'last_name'
    'nickname'
    'description'
  ]


class Comment extends ContentObject
  relations: [
    {
      type: Backbone.One
      key: 'author'
      relatedModel: Author
      serialize: ['id']
      map: map
    }
  ]

  defaultFields: [
    'id'
    'url'
    'name'
    'date'
    'content'
    'parent'
    'author'
  ]


class Attachment extends ContentObject
  defaultFields: [
    'id'
    'url'
    'slug'
    'title'
    'description'
    'caption'
    'parent'
    'mime_type'
    'images'
  ]

class MenuItem extends ContentObject
  defaultFields: [
    'ID'
    'post_author'
    'post_date'
    'post_date_gmt'
    'post_content'
    'post_title'
    'post_excerpt'
    'post_status'
    'comment_status'
    'ping_status'
    'post_password'
    'post_name'
    'to_ping'
    'pinged'
    'post_modified'
    'post_modified_gmt'
    'post_content_filtered'
    'post_parent'
    'guid'
    'menu_order'
    'post_type'
    'post_mime_type'
    'comment_count'
    'filter'
    'db_id'
    'menu_item_parent'
    'object_id'
    'object'
    'type'
    'type_label'
    'title'
    'url'
    'target'
    'attr_title'
    'description'
    'classes'
    'xfn'
  ]


class Post extends ContentObject
  relations: [
    {
      type: Backbone.One
      key: 'author'
      relatedModel: Author
      serialize: ['id']
      map: map
    }
    {
      type: Backbone.Many
      key: 'attachments'
      relatedModel: Attachment
      serialize: ['id']
      map: map
    }
    {
      type: Backbone.Many
      key: 'comments'
      relatedModel: Comment
      serialize: ['id']
      map: map
    }
    {
      type: Backbone.Many
      key: 'tags'
      relatedModel: Tag
      serialize: ['id']
      map: map
    }
    {
      type: Backbone.Many
      key: 'categories'
      relatedModel: Category
      serialize: ['id']
      map: map
    }
  ]

  defaultFields: [
    'id'
    'url'
    'type'
    'slug'
    'status'
    'title'
    'title_plain'
    'content'
    'excerpt'
    'date'
    'modified'
    'categories'
    'tags'
    'author'
    'comments'
    'attachments'
    'comment_count'
    'comment_status'
    'custom_fields'
  ]

class ObjectCollection extends Backbone.Collection
  ###*
   * @param {WordPress} @wp Used to let the collection interact with other
     collections from the WordPress instance.
  ###
  constructor: (@wp) ->
    super()
    @on 'add change', @saveModel

  ###*
   * Make the model get saved after it's changed
   * @param {ContentObject} model
  ###
  saveModel: (model) ->
    model.save()


class Posts extends ObjectCollection
  model: Post


class Categories extends ObjectCollection
  model: Category


class Tags extends ObjectCollection
  model: Tag


class Authors extends ObjectCollection
  model: Author


class Comments extends ObjectCollection
  model: Comment


class Attachments extends ObjectCollection
  model: Attachment


class MenuItems extends ObjectCollection
  model: MenuItem

  constructor: (wp) ->
    super(wp)
    @on 'add', (model) ->
      model.set 'children', []

      parentId = +model.get('menu_item_parent') # make it an int
      if parentId isnt 0
        model.set 'is_root_level', false

        # Switch from having each MenuItem denote its parent, to having each
        # list their children (easier to walk). This relies on the post's parent
        # having already been added... which seems to be the order that
        # wordpress gives it to us in.
        parent = @findWhere(ID: parentId)
        parent.set 'children', parent.get('children').concat(model)
      else
        # there's nothing above this menu element
        model.set 'is_root_level', true

      model.unset 'menu_item_parent'

###*
 * Lightweight wrapper around MenuItems
###
class Menu extends Backbone.Model
  name: ''

  ###*
   * [items description]
   * @type {MenuItems}
  ###
  items: undefined

  constructor: (wp) ->
    super()
    @set(items: new MenuItems(wp))


class Menus extends ObjectCollection
  model: Menu

###*
 * Handles inter-object relationships, caching, and interacting with the
   backend API
###
class WordPress
  ###*
   * The URL where the backend is.
   * @type {String}
  ###
  backendURL: ''

  ###*
   * The maximum number of posts to ask for in a request. (the `count` param)
   * @type {Integer}
  ###
  maxPostsPerRequest: 10

  cache: {}

  constructor: (@backendURL) ->
    # these need to be made here to set @wp (`this`) properly
    @cache.attachments = new Attachments(this)
    @cache.posts = new Posts(this)
    @cache.pages = new Posts(this)
    @cache.categories = new Categories(this)
    @cache.tags = new Tags(this)
    @cache.authors = new Authors(this)
    @cache.comments = new Comments(this)
    @cache.menus = new Menus(this)

    for name, collection of @cache
      collection.localStorage = new Backbone.LocalStorage name

  makeURL: (params) ->
    query = []
    for name, value of params
      query.push "#{name}=#{value}"

    url = @backendURL
    if query.length isnt 0
      url += "?#{query.join('&')}"

    url

  request: (method, params={}, cb) ->
    params['json'] = method
    jsonp(@makeURL(params), {}, cb)

  ###*
   * Load everything from the cache. this should be called after all the
     events are attached to the various collections, and before anything is
     added to the collections.
  ###
  loadCache: ->
    for name, collection of @cache
      collection.fetch()

  ###*
   * [getPosts description]
  ###
  getPosts: (query={}) ->
    @request 'get_posts', query, (err, data) =>
      unless err
        @cache.posts.add data['posts']

  getPages: (query={}) ->
    @request 'get_page_index', query, (err, data) =>
      unless err
        @cache.pages.add data['pages']

  getMenu: (name) =>
    @request 'get_menu', name:name, (err, data) =>
      unless err
        menu = new Menu(this)
        menu.set(name: name)
        menu.get('items').add(data['menu'])
        @cache.menus.add(menu)

module.exports = WordPress
