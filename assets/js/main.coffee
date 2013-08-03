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


require ['jquery', 'JSONP'], ($, JSONP) ->
	jsonp = new JSONP('callback')

	jsonp.get("#{BACKEND_URL}/?json=1", {}, (data) ->
		console.log data
	)
