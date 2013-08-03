#
#* Lightweight JSONP fetcher
#* Copyright 2010-2012 Erik Karlsson. All rights reserved.
#* BSD licensed
#

#
#* Usage:
#*
#* JSONP.get( 'someUrl.php', {param1:'123', param2:'456'}, function(data){
#*   //do something with data, which is the JSON object you should retrieve from someUrl.php
#* });
#
define [], ->
  class JSONP
    constructor: (callbackParam = 'callback') ->
      @head = document.getElementsByTagName("head")[0]
      @callbackParam = callbackParam

    ###*
     * A quick and simple UUID function. Credit to
       https://gist.github.com/jed/982883
     * @return {String} A random string
    ###
    uuid: (a) ->
      `a?(a^Math.random()*16>>a/4).toString(16):([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,this.uuid)`

    head: undefined

    ###*
     * The GET parameter that holds the name of the callback.
     * @default 'callback'
     * @type {String}
    ###
    callbackParam: ''

    load: (url, errorHandler) ->
      script = document.createElement("script")
      done = false
      script.src = url
      script.async = true
      if typeof errorHandler is "function"
        script.onerror = (ex) ->
          errorHandler
            url: url
            event: ex

      script.onload = script.onreadystatechange = ->
        if not done and (not @readyState or @readyState is "loaded" or @readyState is "complete")
          done = true
          script.onload = script.onreadystatechange = null
          script.parentNode.removeChild script if script and script.parentNode

      @head.appendChild script

    encode: (str) ->
      encodeURIComponent str

    get: (url, params = {}, callback) ->
      query = (if (url or "").indexOf("?") is -1 then "?" else "&")
      key = undefined
      uniqueName = 'jsonp_' + @uuid()

      for key of params
        if params.hasOwnProperty(key)
          query += encode(key) + "=" + encode(params[key]) + "&"
      window[uniqueName] = (data) ->
        callback data
        try
          delete window[uniqueName]
        window[uniqueName] = null

      @load url + query + @callbackParam + "=" + uniqueName
      return

  return JSONP
