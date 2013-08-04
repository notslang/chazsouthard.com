(function() {
  var BACKEND_URL;

  BACKEND_URL = 'http://69.55.49.53';

  require.config({
    paths: {
      underscore: '../components/underscore/underscore',
      backbone: '../components/backbone/backbone',
      jquery: '../components/jquery/jquery.min'
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

  require(['jquery'], function($) {
    return $.ajax({
      url: "" + BACKEND_URL + "/?json=1"
    }).done(function(data) {
      return console.log(data);
    });
  });

}).call(this);
