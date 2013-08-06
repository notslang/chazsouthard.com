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
    jsonp = new JSONP();
    return jsonp.get("" + BACKEND_URL + "/?json=1", {}, function(data) {
      var post, _i, _len, _ref, _results;
      console.log(data);
      _ref = data['posts'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        post = _ref[_i];
        _results.push($('body').append("<section>\n	<h1 class=\"title\">" + post['title'] + "</h1>\n	<span class=\"author\">by " + post['author']['name'] + "</span>\n	" + post['content'] + "\n<section>"));
      }
      return _results;
    });
  });

}).call(this);
