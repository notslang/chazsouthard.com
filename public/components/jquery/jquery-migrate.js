!function(t,e,i){function n(i){s[i]||(s[i]=!0,t.migrateWarnings.push(i),e.console&&console.warn&&!t.migrateMute&&(console.warn("JQMIGRATE: "+i),t.migrateTrace&&console.trace&&console.trace()))}function r(e,i,r,s){if(Object.defineProperty)try{return Object.defineProperty(e,i,{configurable:!0,enumerable:!0,get:function(){return n(s),r},set:function(t){n(s),r=t}}),void 0}catch(o){}t._definePropertyBroken=!0,e[i]=r}var s={};t.migrateWarnings=[],!t.migrateMute&&e.console&&console.log&&console.log("JQMIGRATE: Logging is active"),t.migrateTrace===i&&(t.migrateTrace=!0),t.migrateReset=function(){s={},t.migrateWarnings.length=0},"BackCompat"===document.compatMode&&n("jQuery is not compatible with Quirks Mode");var o=t("<input/>",{size:1}).attr("size")&&t.attrFn,a=t.attr,u=t.attrHooks.value&&t.attrHooks.value.get||function(){return null},h=t.attrHooks.value&&t.attrHooks.value.set||function(){return i},c=/^(?:input|button)$/i,l=/^[238]$/,d=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,p=/^(?:checked|selected)$/i;r(t,"attrFn",o||{},"jQuery.attrFn is deprecated"),t.attr=function(e,r,s,u){var h=r.toLowerCase(),f=e&&e.nodeType;return u&&(a.length<4&&n("jQuery.fn.attr( props, pass ) is deprecated"),e&&!l.test(f)&&(o?r in o:t.isFunction(t.fn[r])))?t(e)[r](s):("type"===r&&s!==i&&c.test(e.nodeName)&&e.parentNode&&n("Can't change the 'type' of an input or button in IE 6/7/8"),!t.attrHooks[h]&&d.test(h)&&(t.attrHooks[h]={get:function(e,n){var r,s=t.prop(e,n);return s===!0||"boolean"!=typeof s&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():i},set:function(e,i,n){var r;return i===!1?t.removeAttr(e,n):(r=t.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},p.test(h)&&n("jQuery.fn.attr('"+h+"') may use property instead of attribute")),a.call(t,e,r,s))},t.attrHooks.value={get:function(t,e){var i=(t.nodeName||"").toLowerCase();return"button"===i?u.apply(this,arguments):("input"!==i&&"option"!==i&&n("jQuery.fn.attr('value') no longer gets properties"),e in t?t.value:null)},set:function(t,e){var i=(t.nodeName||"").toLowerCase();return"button"===i?h.apply(this,arguments):("input"!==i&&"option"!==i&&n("jQuery.fn.attr('value', val) no longer sets properties"),t.value=e,void 0)}};var f,g,m=t.fn.init,v=t.parseJSON,y=/^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;t.fn.init=function(e,i,r){var s;return e&&"string"==typeof e&&!t.isPlainObject(i)&&(s=y.exec(e))&&s[1]&&("<"!==e.charAt(0)&&n("$(html) HTML strings must start with '<' character"),i&&i.context&&(i=i.context),t.parseHTML)?m.call(this,t.parseHTML(t.trim(e),i,!0),i,r):m.apply(this,arguments)},t.fn.init.prototype=t.fn,t.parseJSON=function(t){return t||null===t?v.apply(this,arguments):(n("jQuery.parseJSON requires a valid JSON string"),null)},t.uaMatch=function(t){t=t.toLowerCase();var e=/(chrome)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[];return{browser:e[1]||"",version:e[2]||"0"}},t.browser||(f=t.uaMatch(navigator.userAgent),g={},f.browser&&(g[f.browser]=!0,g.version=f.version),g.chrome?g.webkit=!0:g.webkit&&(g.safari=!0),t.browser=g),r(t,"browser",t.browser,"jQuery.browser is deprecated"),t.sub=function(){function e(t,i){return new e.fn.init(t,i)}t.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(n,r){return r&&r instanceof t&&!(r instanceof e)&&(r=e(r)),t.fn.init.call(this,n,r,i)},e.fn.init.prototype=e.fn;var i=e(document);return n("jQuery.sub() is deprecated"),e},t.ajaxSetup({converters:{"text json":t.parseJSON}});var b=t.fn.data;t.fn.data=function(e){var r,s,o=this[0];return!o||"events"!==e||1!==arguments.length||(r=t.data(o,e),s=t._data(o,e),r!==i&&r!==s||s===i)?b.apply(this,arguments):(n("Use of jQuery.fn.data('events') is deprecated"),s)};var _=/\/(java|ecma)script/i,w=t.fn.andSelf||t.fn.addBack;t.fn.andSelf=function(){return n("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},t.clean||(t.clean=function(e,i,r,s){i=i||document,i=!i.nodeType&&i[0]||i,i=i.ownerDocument||i,n("jQuery.clean() is deprecated");var o,a,u,h,c=[];if(t.merge(c,t.buildFragment(e,i).childNodes),r)for(u=function(t){return!t.type||_.test(t.type)?s?s.push(t.parentNode?t.parentNode.removeChild(t):t):r.appendChild(t):void 0},o=0;null!=(a=c[o]);o++)t.nodeName(a,"script")&&u(a)||(r.appendChild(a),"undefined"!=typeof a.getElementsByTagName&&(h=t.grep(t.merge([],a.getElementsByTagName("script")),u),c.splice.apply(c,[o+1,0].concat(h)),o+=h.length));return c});var x=t.event.add,E=t.event.remove,k=t.event.trigger,S=t.fn.toggle,T=t.fn.live,j=t.fn.die,N="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",A=new RegExp("\\b(?:"+N+")\\b"),q=/(?:^|\s)hover(\.\S+|)\b/,M=function(e){return"string"!=typeof e||t.event.special.hover?e:(q.test(e)&&n("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),e&&e.replace(q,"mouseenter$1 mouseleave$1"))};t.event.props&&"attrChange"!==t.event.props[0]&&t.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),t.event.dispatch&&r(t.event,"handle",t.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),t.event.add=function(t,e,i,r,s){t!==document&&A.test(e)&&n("AJAX events should be attached to document: "+e),x.call(this,t,M(e||""),i,r,s)},t.event.remove=function(t,e,i,n,r){E.call(this,t,M(e)||"",i,n,r)},t.fn.error=function(){var t=Array.prototype.slice.call(arguments,0);return n("jQuery.fn.error() is deprecated"),t.splice(0,0,"error"),arguments.length?this.bind.apply(this,t):(this.triggerHandler.apply(this,t),this)},t.fn.toggle=function(e,i){if(!t.isFunction(e)||!t.isFunction(i))return S.apply(this,arguments);n("jQuery.fn.toggle(handler, handler...) is deprecated");var r=arguments,s=e.guid||t.guid++,o=0,a=function(i){var n=(t._data(this,"lastToggle"+e.guid)||0)%o;return t._data(this,"lastToggle"+e.guid,n+1),i.preventDefault(),r[n].apply(this,arguments)||!1};for(a.guid=s;o<r.length;)r[o++].guid=s;return this.click(a)},t.fn.live=function(e,i,r){return n("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(t(this.context).on(e,this.selector,i,r),this)},t.fn.die=function(e,i){return n("jQuery.fn.die() is deprecated"),j?j.apply(this,arguments):(t(this.context).off(e,this.selector||"**",i),this)},t.event.trigger=function(t,e,i,r){return i||A.test(t)||n("Global events are undocumented and deprecated"),k.call(this,t,e,i||document,r)},t.each(N.split("|"),function(e,i){t.event.special[i]={setup:function(){var e=this;return e!==document&&(t.event.add(document,i+"."+t.guid,function(){t.event.trigger(i,null,e,!0)}),t._data(this,i,t.guid++)),!1},teardown:function(){return this!==document&&t.event.remove(document,i+"."+t._data(this,i)),!1}}})}(jQuery,window);