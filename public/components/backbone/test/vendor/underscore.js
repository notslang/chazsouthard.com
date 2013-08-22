!function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,o=Function.prototype,a=r.push,s=r.slice,u=r.concat,l=i.toString,c=i.hasOwnProperty,f=r.forEach,d=r.map,p=r.reduce,h=r.reduceRight,g=r.filter,m=r.every,v=r.some,y=r.indexOf,b=r.lastIndexOf,x=Array.isArray,w=Object.keys,k=o.bind,q=function(e){return e instanceof q?e:this instanceof q?(this._wrapped=e,void 0):new q(e)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=q),exports._=q):e._=q,q.VERSION="1.4.3";var _=q.each=q.forEach=function(e,t,r){if(null!=e)if(f&&e.forEach===f)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,o=e.length;o>i;i++)if(t.call(r,e[i],i,e)===n)return}else for(var a in e)if(q.has(e,a)&&t.call(r,e[a],a,e)===n)return};q.map=q.collect=function(e,t,n){var r=[];return null==e?r:d&&e.map===d?e.map(t,n):(_(e,function(e,i,o){r[r.length]=t.call(n,e,i,o)}),r)};var E="Reduce of empty array with no initial value";q.reduce=q.foldl=q.inject=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),p&&e.reduce===p)return r&&(t=q.bind(t,r)),i?e.reduce(t,n):e.reduce(t);if(_(e,function(e,o,a){i?n=t.call(r,n,e,o,a):(n=e,i=!0)}),!i)throw new TypeError(E);return n},q.reduceRight=q.foldr=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),h&&e.reduceRight===h)return r&&(t=q.bind(t,r)),i?e.reduceRight(t,n):e.reduceRight(t);var o=e.length;if(o!==+o){var a=q.keys(e);o=a.length}if(_(e,function(s,u,l){u=a?a[--o]:--o,i?n=t.call(r,n,e[u],u,l):(n=e[u],i=!0)}),!i)throw new TypeError(E);return n},q.find=q.detect=function(e,t,n){var r;return T(e,function(e,i,o){return t.call(n,e,i,o)?(r=e,!0):void 0}),r},q.filter=q.select=function(e,t,n){var r=[];return null==e?r:g&&e.filter===g?e.filter(t,n):(_(e,function(e,i,o){t.call(n,e,i,o)&&(r[r.length]=e)}),r)},q.reject=function(e,t,n){return q.filter(e,function(e,r,i){return!t.call(n,e,r,i)},n)},q.every=q.all=function(e,t,r){t||(t=q.identity);var i=!0;return null==e?i:m&&e.every===m?e.every(t,r):(_(e,function(e,o,a){return(i=i&&t.call(r,e,o,a))?void 0:n}),!!i)};var T=q.some=q.any=function(e,t,r){t||(t=q.identity);var i=!1;return null==e?i:v&&e.some===v?e.some(t,r):(_(e,function(e,o,a){return i||(i=t.call(r,e,o,a))?n:void 0}),!!i)};q.contains=q.include=function(e,t){return null==e?!1:y&&e.indexOf===y?-1!=e.indexOf(t):T(e,function(e){return e===t})},q.invoke=function(e,t){var n=s.call(arguments,2);return q.map(e,function(e){return(q.isFunction(t)?t:e[t]).apply(e,n)})},q.pluck=function(e,t){return q.map(e,function(e){return e[t]})},q.where=function(e,t){return q.isEmpty(t)?[]:q.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},q.max=function(e,t,n){if(!t&&q.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&q.isEmpty(e))return-1/0;var r={computed:-1/0,value:-1/0};return _(e,function(e,i,o){var a=t?t.call(n,e,i,o):e;a>=r.computed&&(r={value:e,computed:a})}),r.value},q.min=function(e,t,n){if(!t&&q.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&q.isEmpty(e))return 1/0;var r={computed:1/0,value:1/0};return _(e,function(e,i,o){var a=t?t.call(n,e,i,o):e;a<r.computed&&(r={value:e,computed:a})}),r.value},q.shuffle=function(e){var t,n=0,r=[];return _(e,function(e){t=q.random(n++),r[n-1]=r[t],r[t]=e}),r};var j=function(e){return q.isFunction(e)?e:function(t){return t[e]}};q.sortBy=function(e,t,n){var r=j(t);return q.pluck(q.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(r>n||void 0===r)return-1}return e.index<t.index?-1:1}),"value")};var C=function(e,t,n,r){var i={},o=j(t||q.identity);return _(e,function(t,a){var s=o.call(n,t,a,e);r(i,s,t)}),i};q.groupBy=function(e,t,n){return C(e,t,n,function(e,t,n){(q.has(e,t)?e[t]:e[t]=[]).push(n)})},q.countBy=function(e,t,n){return C(e,t,n,function(e,t){q.has(e,t)||(e[t]=0),e[t]++})},q.sortedIndex=function(e,t,n,r){n=null==n?q.identity:j(n);for(var i=n.call(r,t),o=0,a=e.length;a>o;){var s=o+a>>>1;n.call(r,e[s])<i?o=s+1:a=s}return o},q.toArray=function(e){return e?q.isArray(e)?s.call(e):e.length===+e.length?q.map(e,q.identity):q.values(e):[]},q.size=function(e){return null==e?0:e.length===+e.length?e.length:q.keys(e).length},q.first=q.head=q.take=function(e,t,n){return null==e?void 0:null==t||n?e[0]:s.call(e,0,t)},q.initial=function(e,t,n){return s.call(e,0,e.length-(null==t||n?1:t))},q.last=function(e,t,n){return null==e?void 0:null==t||n?e[e.length-1]:s.call(e,Math.max(e.length-t,0))},q.rest=q.tail=q.drop=function(e,t,n){return s.call(e,null==t||n?1:t)},q.compact=function(e){return q.filter(e,q.identity)};var N=function(e,t,n){return _(e,function(e){q.isArray(e)?t?a.apply(n,e):N(e,t,n):n.push(e)}),n};q.flatten=function(e,t){return N(e,t,[])},q.without=function(e){return q.difference(e,s.call(arguments,1))},q.uniq=q.unique=function(e,t,n,r){q.isFunction(t)&&(r=n,n=t,t=!1);var i=n?q.map(e,n,r):e,o=[],a=[];return _(i,function(n,r){(t?r&&a[a.length-1]===n:q.contains(a,n))||(a.push(n),o.push(e[r]))}),o},q.union=function(){return q.uniq(u.apply(r,arguments))},q.intersection=function(e){var t=s.call(arguments,1);return q.filter(q.uniq(e),function(e){return q.every(t,function(t){return q.indexOf(t,e)>=0})})},q.difference=function(e){var t=u.apply(r,s.call(arguments,1));return q.filter(e,function(e){return!q.contains(t,e)})},q.zip=function(){for(var e=s.call(arguments),t=q.max(q.pluck(e,"length")),n=new Array(t),r=0;t>r;r++)n[r]=q.pluck(e,""+r);return n},q.object=function(e,t){if(null==e)return{};for(var n={},r=0,i=e.length;i>r;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},q.indexOf=function(e,t,n){if(null==e)return-1;var r=0,i=e.length;if(n){if("number"!=typeof n)return r=q.sortedIndex(e,t),e[r]===t?r:-1;r=0>n?Math.max(0,i+n):n}if(y&&e.indexOf===y)return e.indexOf(t,n);for(;i>r;r++)if(e[r]===t)return r;return-1},q.lastIndexOf=function(e,t,n){if(null==e)return-1;var r=null!=n;if(b&&e.lastIndexOf===b)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);for(var i=r?n:e.length;i--;)if(e[i]===t)return i;return-1},q.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;for(var r=Math.max(Math.ceil((t-e)/n),0),i=0,o=new Array(r);r>i;)o[i++]=e,e+=n;return o};var S=function(){};q.bind=function(e,t){var n,r;if(e.bind===k&&k)return k.apply(e,s.call(arguments,1));if(!q.isFunction(e))throw new TypeError;return n=s.call(arguments,2),r=function(){if(!(this instanceof r))return e.apply(t,n.concat(s.call(arguments)));S.prototype=e.prototype;var i=new S;S.prototype=null;var o=e.apply(i,n.concat(s.call(arguments)));return Object(o)===o?o:i}},q.bindAll=function(e){var t=s.call(arguments,1);return 0===t.length&&(t=q.functions(e)),_(t,function(t){e[t]=q.bind(e[t],e)}),e},q.memoize=function(e,t){var n={};return t||(t=q.identity),function(){var r=t.apply(this,arguments);return q.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},q.delay=function(e,t){var n=s.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},q.defer=function(e){return q.delay.apply(q,[e,1].concat(s.call(arguments,1)))},q.throttle=function(e,t){var n,r,i,o,a=0,s=function(){a=new Date,i=null,o=e.apply(n,r)};return function(){var u=new Date,l=t-(u-a);return n=this,r=arguments,0>=l?(clearTimeout(i),i=null,a=u,o=e.apply(n,r)):i||(i=setTimeout(s,l)),o}},q.debounce=function(e,t,n){var r,i;return function(){var o=this,a=arguments,s=function(){r=null,n||(i=e.apply(o,a))},u=n&&!r;return clearTimeout(r),r=setTimeout(s,t),u&&(i=e.apply(o,a)),i}},q.once=function(e){var t,n=!1;return function(){return n?t:(n=!0,t=e.apply(this,arguments),e=null,t)}},q.wrap=function(e,t){return function(){var n=[e];return a.apply(n,arguments),t.apply(this,n)}},q.compose=function(){var e=arguments;return function(){for(var t=arguments,n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},q.after=function(e,t){return 0>=e?t():function(){return--e<1?t.apply(this,arguments):void 0}},q.keys=w||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)q.has(e,n)&&(t[t.length]=n);return t},q.values=function(e){var t=[];for(var n in e)q.has(e,n)&&t.push(e[n]);return t},q.pairs=function(e){var t=[];for(var n in e)q.has(e,n)&&t.push([n,e[n]]);return t},q.invert=function(e){var t={};for(var n in e)q.has(e,n)&&(t[e[n]]=n);return t},q.functions=q.methods=function(e){var t=[];for(var n in e)q.isFunction(e[n])&&t.push(n);return t.sort()},q.extend=function(e){return _(s.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},q.pick=function(e){var t={},n=u.apply(r,s.call(arguments,1));return _(n,function(n){n in e&&(t[n]=e[n])}),t},q.omit=function(e){var t={},n=u.apply(r,s.call(arguments,1));for(var i in e)q.contains(n,i)||(t[i]=e[i]);return t},q.defaults=function(e){return _(s.call(arguments,1),function(t){if(t)for(var n in t)null==e[n]&&(e[n]=t[n])}),e},q.clone=function(e){return q.isObject(e)?q.isArray(e)?e.slice():q.extend({},e):e},q.tap=function(e,t){return t(e),e};var B=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof q&&(e=e._wrapped),t instanceof q&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1;for(var o=n.length;o--;)if(n[o]==e)return r[o]==t;n.push(e),r.push(t);var a=0,s=!0;if("[object Array]"==i){if(a=e.length,s=a==t.length)for(;a--&&(s=B(e[a],t[a],n,r)););}else{var u=e.constructor,c=t.constructor;if(u!==c&&!(q.isFunction(u)&&u instanceof u&&q.isFunction(c)&&c instanceof c))return!1;for(var f in e)if(q.has(e,f)&&(a++,!(s=q.has(t,f)&&B(e[f],t[f],n,r))))break;if(s){for(f in t)if(q.has(t,f)&&!a--)break;s=!a}}return n.pop(),r.pop(),s};q.isEqual=function(e,t){return B(e,t,[],[])},q.isEmpty=function(e){if(null==e)return!0;if(q.isArray(e)||q.isString(e))return 0===e.length;for(var t in e)if(q.has(e,t))return!1;return!0},q.isElement=function(e){return!(!e||1!==e.nodeType)},q.isArray=x||function(e){return"[object Array]"==l.call(e)},q.isObject=function(e){return e===Object(e)},_(["Arguments","Function","String","Number","Date","RegExp"],function(e){q["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),q.isArguments(arguments)||(q.isArguments=function(e){return!(!e||!q.has(e,"callee"))}),"function"!=typeof/./&&(q.isFunction=function(e){return"function"==typeof e}),q.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},q.isNaN=function(e){return q.isNumber(e)&&e!=+e},q.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==l.call(e)},q.isNull=function(e){return null===e},q.isUndefined=function(e){return void 0===e},q.has=function(e,t){return c.call(e,t)},q.noConflict=function(){return e._=t,this},q.identity=function(e){return e},q.times=function(e,t,n){for(var r=Array(e),i=0;e>i;i++)r[i]=t.call(n,i);return r},q.random=function(e,t){return null==t&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var A={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};A.unescape=q.invert(A.escape);var M={escape:new RegExp("["+q.keys(A.escape).join("")+"]","g"),unescape:new RegExp("("+q.keys(A.unescape).join("|")+")","g")};q.each(["escape","unescape"],function(e){q[e]=function(t){return null==t?"":(""+t).replace(M[e],function(t){return A[e][t]})}}),q.result=function(e,t){if(null==e)return null;var n=e[t];return q.isFunction(n)?n.call(e):n},q.mixin=function(e){_(q.functions(e),function(t){var n=q[t]=e[t];q.prototype[t]=function(){var e=[this._wrapped];return a.apply(e,arguments),F.call(this,n.apply(q,e))}})};var O=0;q.uniqueId=function(e){var t=""+ ++O;return e?e+t:t},q.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var D=/(.)^/,L={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},H=/\\|'|\r|\n|\t|\u2028|\u2029/g;q.template=function(e,t,n){var r;n=q.defaults({},n,q.templateSettings);var i=new RegExp([(n.escape||D).source,(n.interpolate||D).source,(n.evaluate||D).source].join("|")+"|$","g"),o=0,a="__p+='";e.replace(i,function(t,n,r,i,s){return a+=e.slice(o,s).replace(H,function(e){return"\\"+L[e]}),n&&(a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(a+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(a+="';\n"+i+"\n__p+='"),o=s+t.length,t}),a+="';\n",n.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{r=new Function(n.variable||"obj","_",a)}catch(s){throw s.source=a,s}if(t)return r(t,q);var u=function(e){return r.call(this,e,q)};return u.source="function("+(n.variable||"obj")+"){\n"+a+"}",u},q.chain=function(e){return q(e).chain()};var F=function(e){return this._chain?q(e).chain():e};q.mixin(q),_(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];q.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!=e&&"splice"!=e||0!==n.length||delete n[0],F.call(this,n)}}),_(["concat","join","slice"],function(e){var t=r[e];q.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),q.extend(q.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this);