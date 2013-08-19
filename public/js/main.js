(function() {
  var BACKEND_URL,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

  require(['jquery', 'JSONP', 'backbone'], function($, JSONP, Backbone) {
    var NavView, Page, PageView, PagesCollection, Router, jsonp, page, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    jsonp = new JSONP();
    jsonp.get("" + BACKEND_URL + "/?json=1", {}, function(data) {
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
    String.prototype.title_case = function() {
      return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };
    /**
    	 * modify the navbar to highlight the correct current page.
    	 * this view just manages the navbar at the top of the page
    */

    NavView = (function(_super) {
      __extends(NavView, _super);

      function NavView() {
        _ref = NavView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      NavView.prototype.el = $('nav .buttonset');

      NavView.prototype.render = function() {
        var page;
        page = this.model.current_page().get('name');
        document.title = "" + (page.replace("_", " ").title_case()) + " | Chaz Southard";
        this.$el.find("\#" + page + "_nav").attr("checked", true);
        return console.log("(nav) page: " + page);
      };

      NavView.prototype.initialize = function() {
        _.bindAll(this);
        return this.model.on('change:selected', this.render);
      };

      return NavView;

    })(Backbone.View);
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref1 = Router.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      Router.prototype.routes = {
        "*page": "change_page"
      };

      Router.prototype.change_page = function(page) {
        if (page !== "") {
          return this.model.change_page(page);
        }
      };

      Router.prototype.initialize = function(options) {
        return this.model = options.model;
      };

      return Router;

    })(Backbone.Router);
    Page = (function(_super) {
      __extends(Page, _super);

      function Page() {
        _ref2 = Page.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      Page.prototype.defaults = {
        name: '',
        selected: false,
        first_load: (function() {}),
        on_load: (function() {}),
        on_unload: (function() {})
      };

      Page.prototype.sync = function() {
        return false;
      };

      Page.prototype.onchange = function() {
        if (this.get('selected')) {
          return this.get('on_load').call();
        } else {
          return this.get('on_unload').call();
        }
      };

      Page.prototype.initialize = function() {
        _.bindAll(this);
        this.on('change:selected', this.onchange);
        return this.get('first_load').call();
      };

      return Page;

    })(Backbone.Model);
    PageView = (function(_super) {
      __extends(PageView, _super);

      function PageView() {
        _ref3 = PageView.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      PageView.prototype.render = function() {
        if (this.model.get('selected')) {
          return this.el.style.display = 'block';
        } else {
          return this.el.style.display = 'none';
        }
      };

      PageView.prototype.initialize = function() {
        _.bindAll(this);
        this.model.on('change:selected', this.render);
        this.model.view = this;
        return this.el = $("\#" + (this.model.get('name')) + "_content")[0];
      };

      return PageView;

    })(Backbone.View);
    PagesCollection = (function(_super) {
      __extends(PagesCollection, _super);

      function PagesCollection() {
        _ref4 = PagesCollection.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      PagesCollection.prototype.model = Page;

      PagesCollection.prototype.default_page = 'chaz';

      PagesCollection.prototype.added_page = function(page_model) {
        return new PageView({
          model: page_model
        });
      };

      PagesCollection.prototype.control = function(name) {};

      PagesCollection.prototype.change_page = function(page_name) {
        var page;
        page = this.find(function(page_obj) {
          return page_obj.get('name') === page_name;
        });
        try {
          this.current_page().set({
            selected: false
          });
        } catch (_error) {}
        if (page != null) {
          return page.set({
            selected: true
          });
        } else {
          console.log("" + page_name + " doesn't exist, redirecting to " + this.default_page + "...");
          return router.navigate(this.default_page, {
            trigger: true,
            replace: true
          });
        }
      };

      /**
      		 * @return Page the model of the active page
      */


      PagesCollection.prototype.current_page = function() {
        return this.where({
          selected: true
        })[0];
      };

      PagesCollection.prototype.initialize = function() {
        _.bindAll(this);
        return this.on("add", this.added_page);
      };

      return PagesCollection;

    })(Backbone.Collection);
    window.pages = new PagesCollection();
    window.router = new Router({
      model: pages
    });
    window.navView = new NavView({
      model: pages
    });
    _ref5 = ['chaz', 'portfolio', 'about', 'blog', 'contact'];
    for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
      page = _ref5[_i];
      pages.create({
        name: page
      });
    }
    Backbone.history.start();
    if (Backbone.history.fragment === '') {
      App.Router.navigate(pages.default_page, {
        trigger: true,
        replace: true
      });
    }
  });

}).call(this);
