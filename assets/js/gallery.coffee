Backbone = require 'backbone'

###*
 * A quick and simple UUID function. Credit to
   https://gist.github.com/jed/982883
 * @return {String} A random string
###
uuid = (a) ->
  `a?(a^Math.random()*16>>a/4).toString(16):([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,uuid)`

class PhotoView extends Backbone.View
  tagName: 'figure'
  render: ->
    @el.innerHTML = """
    <a class="fancybox" rel="#{@model.get('group_id')}" href="#{@model.get('url')}" title="#{@model.get('title')}">
      <img src="#{@model.get('thumb_url')}" alt="" />
      <figcaption>#{@model.get('title')}</figcaption>
    </a>
    """

  initialize: =>
    @model.view = @
    @render()

class GalleryView extends Backbone.View
  className: 'gallery'

class Gallery extends Backbone.Collection
  added_photo: (photo_model) ->
    #used to create the view for a photo after it has been added
    photo_model.set('group_id', @group_id)
    @view.$el.append(new PhotoView(model: photo_model).el)

  initialize: =>
    @group_id = uuid()
    @on("add", @added_photo)
    @view = new GalleryView model: @

# process_galleries
module.exports =
  Gallery: Gallery
  GalleryView: GalleryView
  PhotoView: PhotoView
