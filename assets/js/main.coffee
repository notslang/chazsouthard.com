# PhantomJS doesn't support bind yet
require 'functionbind'

window.$ = require 'jquery'
_ = require 'underscore'
Backbone = require 'backbone'
jsonp = require 'jsonp'
Gallery = require './gallery'

BACKEND_URL = 'http://69.55.49.53'
WordPress = require 'wp-json-client'
window.API = new WordPress(BACKEND_URL)

PostView = require './postview'
API.cache.posts.on 'add', (model) ->
  #used to create the view for a post after it has been added
  new PostView(model: model)

# these only need to be called... no init
require './flying-focus'
require './jquery.fancybox'
require './jquery.form'
require './contact-form'

require './share'
$('.share').share(
  url: 'http://chazsouthard.com'
  text: 'The portfolio of Chaz Southard'
)

window._wpcf7 =
  loaderUrl: BACKEND_URL + '/wp-content/plugins/contact-form-7/images/ajax-loader.gif',
  sending: "Sending ..."

###*
 * modify the navbar to highlight the correct current page.
 * this view just manages the navbar at the top of the page
###
class NavView extends Backbone.View
  el: $('nav')[0] # element already exists in markup

  render: ->
    page = @model.current_page()

    # set the title of the page
    document.title = "#{page.get('name')} | Chaz Southard"

    # ensure that the correct navbar button is selected... since it is
    # a radio button, it unselects anything else
    @$el.find("\##{page.get('slug')}_nav").prop "checked", true
    @$el.find('select').val('#' + page.get('slug'))

    console.log "(nav) page: #{page.get('name')}"

  added_page: (page_model) ->
    name = page_model.get('name')
    slug = page_model.get('slug')

    @$el.find('.buttonset').append("""
      <input type="radio" name="nav" value="#{slug}", id="#{slug}_nav")>
      <label for="#{slug}_nav">
        <a href="##{slug}">#{name}</a>
      </label>
    """)

    @$el.find('select').append("""
      <option value="##{slug}">#{name}</option>
    """)

  initialize: ->
    _.bindAll @
    @model.on('change:selected', @render)
    @model.on('add', @added_page)


# the router makes the backbuttons work (since we're not really going to
# another page, we are just loading new content for the page we are on). also
# it deals with firing events when the url hash is changed
class Router extends Backbone.Router
  # forward changes in the route to the navigation view
  routes:
    "*page": "change_page"

  change_page: (page) ->
    if page? and page[0] is '#' then page = page[1..]
    if page isnt "" then @model.change_page(page)

  initialize: (options) ->
    # assign a model during init like in a view
    @model = options.model

# this is a model that represents a single page... it's basically just used to
# hold the slug, name, and if it is selected or not
class Page extends Backbone.Model
  defaults:
    name: ''
    slug: ''
    selected: false # value used by Pages for changing the active page
    categories: []

    # bind-able functions... empty by default
    first_load: (->)
    on_load: (->)
    on_unload: (->)

  # represents a page in the application
  sync: ->
    false # changes to Pages don't get stored anywhere

  onchange: ->
    if @get('selected')
      @get('on_load').call()
    else
      @get('on_unload').call()

  initialize: ->
    _.bindAll @
    @on('change:selected', @onchange)

    # for page specific init functions
    @get('first_load').call()

# this is a view that's connected to the page model... it just deals with
# hiding the content of pages that we are not on, and showing the content of
# the page that we are on
class PageView extends Backbone.View
  tagName: 'section'

  render: =>
    if @model.get('selected')
      @el.style.display = 'block' # show
    else
      @el.style.display = 'none' # hide

  initialize: =>
    @model.on('change:selected', @render)
    @model.view = @

    slug = @model.get('slug')

    @$el.attr(
      id: "#{slug}-content"
      class: (
        'category-' + category for category in @model.get('categories')
      ).join(' ')
    )

    @render()

# this is a collection of all the pages in the application... it deals with
# changing the current page when the url changes
class PagesCollection extends Backbone.Collection
  # to determine what should be rendered in the navbar on any given page
  model: Page
  default_page: 'blog'

  added_page: (page_model) ->
    #used to create the view for a page after it has been added
    new PageView(model: page_model)

  change_page: (page_slug) ->
    # update the active page. this should only be called by the router
    page = @find(
      (page_obj) ->
        return page_obj.get('slug') is page_slug
    )

    try
      # deselect the current page (if it's set)
      @current_page().set(selected: false)

    if page?
      page.set(selected: true)
    else
      console.log "#{page_slug} doesn't exist, redirecting to #{@default_page}..."

      router.navigate(@default_page,
        trigger: true
        replace: true
      )

  ###*
   * @return Page the model of the active page
  ###
  current_page: ->
    return @where(selected: true)[0]

  initialize: ->
    _.bindAll @
    @on("add", @added_page)

#create all the models & views in the application
window.pages = new PagesCollection()
window.router = new Router model: pages
window.navView = new NavView model: pages

are_pages_loaded = false
pages_loaded = ->
  if are_pages_loaded
    return
  else
    are_pages_loaded = true

  $('#loading').remove()

  Backbone.history.start()

  # change to default page at startup (if there is no hash fragment)
  if Backbone.history.fragment is ''
    App.Router.navigate(pages.default_page,
      trigger: true
      replace: true
    )

  console.log 'all loaded'
  window.prerenderReady = true

blog = pages.create(
  slug: 'blog'
  name: 'Blog'
)

# bleh, manual render
blog.view.el.innerHTML = ""
$('nav').after(blog.view.el)

API.cache.posts.on 'add', (model) ->
  blog.view.$el.append(model.view.el)

API.cache.pages.on 'add', (model) ->
  categories = []
  for category in model.get 'categories'
    categories.push category.get 'slug'

  pageModel = pages.create(
    slug: model.get 'slug'
    name: model.get 'title'
    categories: categories
    content: model.get 'content'
  )
  $('nav').after(pageModel.view.el)

  # ugh, just manually render
  pageModel.view.el.innerHTML = """
    #{pageModel.get 'content'}
  """

  if model.get('slug') is 'contact'
    #make the contact form work
    form = $('.wpcf7 form')[0]
    $(form).attr('action', API.backendURL + $(form).attr('action'))
    $.wpcf7Init()

  # basically parse the gallery, and spit it back out
  gallery = []
  pageModel.view.$el.find('.gallery').each((i, element) ->
    gallery[i] = new Gallery.Gallery()
    $(element).find('a').each((e) ->
      url = $(@).attr('href')
      img = API.cache.attachments.findWhere(url: url)
      console.log img
      console.log API.cache.attachments
      gallery[i].add(
        title: img.get 'title'
        url: url
        thumb_url: img.get('images')['thumbnail']['url']
        caption: img.get 'caption'
        description: img.get 'description'
        slug: img.get 'slug'
      )
    ).promise().done( ->
      $(element).replaceWith(gallery[i].view.el)
    )
    $(element).find('.gallery a').fancybox(
      nextEffect: 'fade'
      prevEffect: 'fade'
      padding: 0
      margin: [15, 15, 40, 15]
      afterLoad: ->
        list = $("#links")

        if not list.length
          list = $('<ul id="links">')

          for i in [0...@group.length]
            $("<li data-index=\"#{i}\"><label></label></li>").click(->
              $.fancybox.jumpto( $(@).data('index'))
            ).appendTo(list)
          list.appendTo('body')

        list.find('li').removeClass('active').eq( this.index ).addClass('active')
      beforeClose: ->
        $("#links").remove()
    )
  )

  pages_loaded()

API.getPosts()
API.getPages()

$("nav select").change( ->
  window.location = $(@).find("option:selected").val()
)
