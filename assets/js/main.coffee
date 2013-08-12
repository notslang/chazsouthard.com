BACKEND_URL = 'http://69.55.49.53'

require.config(
	paths:
		underscore: '../components/underscore/underscore'
		backbone: '../components/backbone/backbone'
		jquery: '../components/jquery/jquery.min'
		JSONP: '../js/jsonp'
	shim:
		underscore:
			exports: '_'
		backbone:
			deps: ['underscore', 'jquery']
			exports: 'Backbone'
)


require ['jquery', 'JSONP', 'backbone'], ($, JSONP, Backbone) ->
	jsonp = new JSONP()

	jsonp.get("#{BACKEND_URL}/?json=1", {}, (data) ->
		console.log data
		for post in data['posts']
			$('body').append(
				"""
				<section>
					<h1 class="title">#{post['title']}</h1>
					<span class="author">by #{post['author']['name']}</span>
					#{post['content']}
				<section>
				"""
			)
	)

	#general functions
	String::title_case = ->
		@replace /\w\S*/g, (txt) ->
			txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()

	###*
	 * modify the navbar to highlight the correct current page
	###
	class NavView extends Backbone.View
		el: $ 'nav .buttonset'  # element already exists in markup

		render: ->
			page = @model.current_page().get('name')

			# set the title of the page
			document.title = "#{page.replace("_", " ").title_case()} | Chaz Southard"

			# ensure that the correct navbar button is selected... since it is
			# a radio button, it unselects anything else
			@$el.find("\##{page}_nav").attr "checked", true

			console.log "(nav) page: #{page}"

		initialize: ->
			_.bindAll @
			@model.on('change:selected', @render)


	class Router extends Backbone.Router
		# forward changes in the route to the navigation view
		routes:
			"*page": "change_page"

		change_page: (page) ->
			if page isnt "" then @model.change_page(page)

		initialize: (options) ->
			# assign a model during init like in a view
			@model = options.model


	class Page extends Backbone.Model
		defaults:
			name: ''
			login_required: false
			selected: false # value used by Pages for changing the active page
			progressbar: false

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
			@el = $("\##{@model.get('name')}_content")[0]


	class PagesCollection extends Backbone.Collection
		# to determine what should be rendered in the navbar on any given page
		model: Page
		default_page: 'chaz'

		added_page: (page_model) ->
			#used to create the view for a page after it has been added
			new PageView({model: page_model})

		control: (name) ->

		change_page: (page_name) ->
			# update the active page. this should only be called by the router
			page = @find(
				(page_obj) ->
					return page_obj.get('name') is page_name
			)

			try
				# deselect the current page (if it's set)
				@current_page().set(selected: false)

			if page?
				page.set(selected: true)
			else
				console.log "#{page_name} doesn't exist, redirecting to #{@default_page}..."

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


	window.pages = new PagesCollection()
	window.router = new Router model: pages
	window.navView = new NavView model: pages

	for page in ['chaz', 'portfolio', 'about', 'blog', 'contact']
		pages.create(
			name: page
		)

	Backbone.history.start()
	# change to default page at startup (if there is no hash fragment)
	if Backbone.history.fragment is ''
		App.Router.navigate(pages.default_page,
			trigger: true
			replace: true
		)

	return
