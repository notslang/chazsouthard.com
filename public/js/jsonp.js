(function() {
  define([], function() {
    var JSONP;
    JSONP = (function() {
      function JSONP(callbackParam) {
        if (callbackParam == null) {
          callbackParam = 'callback';
        }
        this.head = document.getElementsByTagName("head")[0];
        this.callbackParam = callbackParam;
      }

      /**
       * A quick and simple UUID function. Credit to
         https://gist.github.com/jed/982883
       * @return {String} A random string
      */


      JSONP.prototype.uuid = function(a) {
        return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,this.uuid);
      };

      JSONP.prototype.head = void 0;

      /**
       * The GET parameter that holds the name of the callback.
       * @default 'callback'
       * @type {String}
      */


      JSONP.prototype.callbackParam = '';

      JSONP.prototype.load = function(url, errorHandler) {
        var done, script;
        script = document.createElement("script");
        done = false;
        script.src = url;
        script.async = true;
        if (typeof errorHandler === "function") {
          script.onerror = function(ex) {
            return errorHandler({
              url: url,
              event: ex
            });
          };
        }
        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (script && script.parentNode) {
              return script.parentNode.removeChild(script);
            }
          }
        };
        return this.head.appendChild(script);
      };

      JSONP.prototype.encode = function(str) {
        return encodeURIComponent(str);
      };

      JSONP.prototype.get = function(url, params, callback) {
        var key, query, uniqueName;
        if (params == null) {
          params = {};
        }
        query = ((url || "").indexOf("?") === -1 ? "?" : "&");
        key = void 0;
        uniqueName = 'jsonp_' + this.uuid();
        for (key in params) {
          if (params.hasOwnProperty(key)) {
            query += encode(key) + "=" + encode(params[key]) + "&";
          }
        }
        window[uniqueName] = function(data) {
          callback(data);
          try {
            delete window[uniqueName];
          } catch (_error) {}
          return window[uniqueName] = null;
        };
        this.load(url + query + this.callbackParam + "=" + uniqueName);
      };

      return JSONP;

    })();
    return JSONP;
  });

}).call(this);
