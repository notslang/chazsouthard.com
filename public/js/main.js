(function() {
  var BACKEND_URL;

  BACKEND_URL = 'http://69.55.49.53';

  require.config({
    paths: {
      underscore: '../components/underscore/underscore',
      backbone: '../components/backbone/backbone',
      jquery: '../components/jquery/jquery.min',
      JSONP: '../js/jsonp'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  require(['jquery', 'JSONP'], function($, JSONP) {
    var jsonp;
    jsonp = new JSONP('callback');
    return jsonp.get("" + BACKEND_URL + "/?json=1", {}, function(data) {
      return console.log(data);
    });
  });

}).call(this);
