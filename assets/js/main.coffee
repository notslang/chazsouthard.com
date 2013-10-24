# this points to the server that's holding all our content in wordpress
BACKEND_URL = 'http://69.55.49.53'

# this is require.js stuff for loading JS libraries
require.config(
	paths:
		underscore: '../components/underscore/underscore'
		backbone: '../components/backbone/backbone'
		jquery: '../components/jquery/jquery.min'
		JSONP: '../js/jsonp'
		fancybox: '../components/fancybox/jquery.fancybox'
	shim:
		underscore:
			exports: '_'
		backbone:
			deps: ['underscore', 'jquery']
			exports: 'Backbone'
)

require ['jquery', 'fancybox'], ($) ->
	$('.gallery img').fancybox()

# get the libraries and then call the function
require ['jquery', 'JSONP', 'backbone'], ($, JSONP, Backbone) ->
	#general functions
	String::title_case = ->
		@replace /\w\S*/g, (txt) ->
			txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

	###*
	 * modify the navbar to highlight the correct current page.
	 * this view just manages the navbar at the top of the page
	###
	class NavView extends Backbone.View
		el: $ 'nav'  # element already exists in markup

		render: ->
			page = @model.current_page()

			# set the title of the page
			document.title = "#{page.get('name')} | Chaz Southard"

			# ensure that the correct navbar button is selected... since it is
			# a radio button, it unselects anything else
			@$el.find("\##{page.get('slug')}_nav").prop "checked", true

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

		initialize: ->
			_.bindAll @
			@model.on('change:selected', @render)
			@model.on('add', @added_page)


	# the router makes the backbuttons work (since we're not really going to another page, we are just loading new content for the page we are on). also it deals with firing events when the url hash is changed
	class Router extends Backbone.Router
		# forward changes in the route to the navigation view
		routes:
			"*page": "change_page"

		change_page: (page) ->
			if page isnt "" then @model.change_page(page)

		initialize: (options) ->
			# assign a model during init like in a view
			@model = options.model
	
	# this is a model that represents a single page... it's basically just used to hold the slug, name, and if it is selected or not 
	class Page extends Backbone.Model
		defaults:
			name: ''
			slug: ''
			selected: false # value used by Pages for changing the active page

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

	# this is a view that's connected to the page model... it just deals with hiding the content of pages that we are not on, and showing the content of the page that we are on
	class PageView extends Backbone.View
		render: ->
			if @model.get('selected')
				@el.style.display = 'block' # show
			else
				@el.style.display = 'none' # hide

		initialize: ->
			_.bindAll @

			@model.on('change:selected', @render)
			@model.view = @

			slug = @model.get('slug')
			console.log "loaded #{slug}", window.navView.el

			$(window.navView.el).after("""
				<section id="#{slug}_content">
				</section>
			""")

			@el = $("\##{slug}_content")[0]
			@render()

	# this is a collection of all the pages in the application... it deals with changing the current page when the url changes
	class PagesCollection extends Backbone.Collection
		# to determine what should be rendered in the navbar on any given page
		model: Page
		default_page: 'blog'

		added_page: (page_model) ->
			#used to create the view for a page after it has been added
			new PageView({model: page_model})

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

	#for page in ['chaz', 'portfolio', 'about', 'blog', 'contact']
	#	# loop through all the pages we want, making a model for each one
	#	pages.create(
	#		slug: page
	#	)

	pages_loaded = ->
		Backbone.history.start()
		
		# change to default page at startup (if there is no hash fragment)
		if Backbone.history.fragment is ''
			App.Router.navigate(pages.default_page,
				trigger: true
				replace: true
			)

	# now that jquery, jsonp, and backbone are loaded, init JSONP
	jsonp = new JSONP()

	jsonp.get("#{BACKEND_URL}/?json=get_page_index", {}, (data) ->
		# loop through the pages
		for page in data['pages']
			pages.create(
				slug: page['slug']
				name: page['title']
			)

			# add the content
			$("##{page['slug']}_content")[0].innerHTML = page['content']

		pages_loaded()
	)

	pages.create(
		slug: 'blog'
		name: 'Blog'
	)

	# get all the content on the homepage as JSON and then call the function
	# with the data
	jsonp.get("#{BACKEND_URL}/?json=1", {}, (data) ->
		# loop through the data and make a section for each post, and append it to the blog page
		for post in data['posts']
			$('#blog_content').append("""
			<section>
				<h1 class="title">#{post['title']}</h1>
				<span class="post-info">Posted on <span class="author">#{post['date']}</span> by <span class="author">#{post['author']['name']}</span></span>
				#{post['content']}
			</section>
			""")
	)

