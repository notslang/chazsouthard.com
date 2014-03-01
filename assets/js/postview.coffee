Backbone = require 'backbone'

class PostView extends Backbone.View
  tagName: 'section'

  render: ->
    @el.innerHTML = """
      <h1>#{@model.get 'title'}</h1>
      <p>
        Posted on <span class="date">#{@model.get 'date'}</span>
        by <span class="author">#{@model.get('author')['name']}</span>
      </p>
      #{@model.get 'content'}
    """

  initialize: =>
    @model.view = @
    categories = @model.get('categories').pluck('slug')
    @$el.attr(
      class: categories.join('-category ')
    )

    @model.on('change', @render)
    @render()

module.exports = PostView
