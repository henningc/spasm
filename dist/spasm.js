!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.spasm=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a){return a?"A"===a.tagName?a:d(a.parentNode):null}function e(a){return function(b){var c=d(b.target);c&&1===b.which&&!b.ctrlKey&&!b.metaKey&&a.getLocation(c.href).page&&(b.preventDefault(),a.gotoURL(c.href))}}Object.defineProperty(c,"__esModule",{value:!0});var f=a("./src/router");Object.defineProperty(c,"getURL",{enumerable:!0,get:function(){return f.getURL}}),Object.defineProperty(c,"toURLString",{enumerable:!0,get:function(){return f.toURLString}}),Object.defineProperty(c,"parseQueryString",{enumerable:!0,get:function(){return f.parseQueryString}}),Object.defineProperty(c,"match",{enumerable:!0,get:function(){return f.match}}),Object.defineProperty(c,"getLocation",{enumerable:!0,get:function(){return f.getLocation}}),Object.defineProperty(c,"parseRoute",{enumerable:!0,get:function(){return f.parseRoute}}),Object.defineProperty(c,"createRoute",{enumerable:!0,get:function(){return f.createRoute}}),Object.defineProperty(c,"createRoutes",{enumerable:!0,get:function(){return f.createRoutes}}),Object.defineProperty(c,"formatURL",{enumerable:!0,get:function(){return f.formatURL}});var g=a("./src/spasm");Object.defineProperty(c,"createApp",{enumerable:!0,get:function(){return g.createApp}}),c.monitorLinks=e},{"./src/router":4,"./src/spasm":5}],2:[function(a,b,c){function d(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function e(a){return"function"==typeof a}function f(a){return"number"==typeof a}function g(a){return"object"==typeof a&&null!==a}function h(a){return void 0===a}b.exports=d,d.EventEmitter=d,d.prototype._events=void 0,d.prototype._maxListeners=void 0,d.defaultMaxListeners=10,d.prototype.setMaxListeners=function(a){if(!f(a)||0>a||isNaN(a))throw TypeError("n must be a positive number");return this._maxListeners=a,this},d.prototype.emit=function(a){var b,c,d,f,i,j;if(this._events||(this._events={}),"error"===a&&(!this._events.error||g(this._events.error)&&!this._events.error.length)){if(b=arguments[1],b instanceof Error)throw b;throw TypeError('Uncaught, unspecified "error" event.')}if(c=this._events[a],h(c))return!1;if(e(c))switch(arguments.length){case 1:c.call(this);break;case 2:c.call(this,arguments[1]);break;case 3:c.call(this,arguments[1],arguments[2]);break;default:for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];c.apply(this,f)}else if(g(c)){for(d=arguments.length,f=new Array(d-1),i=1;d>i;i++)f[i-1]=arguments[i];for(j=c.slice(),d=j.length,i=0;d>i;i++)j[i].apply(this,f)}return!0},d.prototype.addListener=function(a,b){var c;if(!e(b))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",a,e(b.listener)?b.listener:b),this._events[a]?g(this._events[a])?this._events[a].push(b):this._events[a]=[this._events[a],b]:this._events[a]=b,g(this._events[a])&&!this._events[a].warned){var c;c=h(this._maxListeners)?d.defaultMaxListeners:this._maxListeners,c&&c>0&&this._events[a].length>c&&(this._events[a].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[a].length),"function"==typeof console.trace&&console.trace())}return this},d.prototype.on=d.prototype.addListener,d.prototype.once=function(a,b){function c(){this.removeListener(a,c),d||(d=!0,b.apply(this,arguments))}if(!e(b))throw TypeError("listener must be a function");var d=!1;return c.listener=b,this.on(a,c),this},d.prototype.removeListener=function(a,b){var c,d,f,h;if(!e(b))throw TypeError("listener must be a function");if(!this._events||!this._events[a])return this;if(c=this._events[a],f=c.length,d=-1,c===b||e(c.listener)&&c.listener===b)delete this._events[a],this._events.removeListener&&this.emit("removeListener",a,b);else if(g(c)){for(h=f;h-->0;)if(c[h]===b||c[h].listener&&c[h].listener===b){d=h;break}if(0>d)return this;1===c.length?(c.length=0,delete this._events[a]):c.splice(d,1),this._events.removeListener&&this.emit("removeListener",a,b)}return this},d.prototype.removeAllListeners=function(a){var b,c;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[a]&&delete this._events[a],this;if(0===arguments.length){for(b in this._events)"removeListener"!==b&&this.removeAllListeners(b);return this.removeAllListeners("removeListener"),this._events={},this}if(c=this._events[a],e(c))this.removeListener(a,c);else for(;c.length;)this.removeListener(a,c[c.length-1]);return delete this._events[a],this},d.prototype.listeners=function(a){var b;return b=this._events&&this._events[a]?e(this._events[a])?[this._events[a]]:this._events[a].slice():[]},d.listenerCount=function(a,b){var c;return c=a._events&&a._events[b]?e(a._events[b])?1:a._events[b].length:0}},{}],3:[function(a,b,c){c.createAtom=function(a,b){function c(b){if(!e(b)){var c=new Error(b+" failed validation");throw c.name="AssertionError",c}var g=a;a=b,Object.keys(d).forEach(function(a){d[a](a,f,g,b)})}var d={},e=b&&b.validator||function(){return!0},f={addWatch:function(a,b){d[a]=b},removeWatch:function(a){delete d[a]},swap:function(b){var d=[a].concat([].slice.call(arguments,1));c(b.apply(null,d))},reset:function(a){c(a)},deref:function(){return a},toString:function(){return"Atom("+JSON.stringify(a)+")"}};return f}},{}],4:[function(a,b,c){"use strict";function d(a,b){for(var c=0,d=b.length;d>c;++c){var e=a(b[c]);if(e)return e}}function e(a,b){for(var c=0,d=b.length;d>c;++c)if(a(b[c]))return b[c]}function f(a,b,c){var d=c.host,e=c.port,f=c.scheme;return a=""+(b.prefix||"")+a,d?(e&&(d=d.replace(/(:.*)?$/,":"+e)),(f||"http")+"://"+d.replace(/\/$/,"")+a):a}function g(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return a?l({path:f(a.paramNames.reduce(function(a,c){return a.replace(":"+c,b[c])},a.route),a,b),query:c}):null}function h(a,b){if(b){var c=a.replace(new RegExp("^"+b),"");return c?c:"/"}return a}function i(a,b,c,d){return g(e(function(a){return a.page===b},a),c,d)}function j(a){return/^-?\d+$/.test(a)?parseInt(a,10):/^-?\d+\.\d+$/.test(a)?parseFloat(a):a}function k(){var a=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];return a.reduce(function(a,b){var c=s(b,2),d=c[0],e=c[1],f=j("string"==typeof e?decodeURIComponent(e):e);return a[d]?(Array.isArray(a[d])||(a[d]=[a[d]]),a[d].push(f)):a[d]=f,a},{})}function l(a){var b=a.query,c=a.path,d=Object.keys(b).map(function(a){return null===b[a]||void 0===b[a]?null:b[a]===!0?a:(Array.isArray(b[a])?b[a]:[b[a]]).map(function(b){return a+"="+encodeURIComponent(b)}).join("&")}).filter(function(a){return a}).join("&");return c+(d?"?"+d:"")}function m(a){return k(a&&a.replace(/^\?/,"").split("&").map(function(a){return/=/.test(a)?a.split("="):[a,!0]})||[])}function n(a,b){var c=a.regexp,d=a.page,e=a.paramNames,f=a.prefix,g=b.match(t),i=s(g,6),j=i[1],l=i[2],n=i[3],o=i[4],p=i[5],q=h(o,f).match(c);return q?{page:d,url:b,path:o,host:l,prefix:f||"",port:Number(n||80),scheme:j||"http",params:k(q.slice(1).map(function(a,b){return[e[b],a]})),query:m(p)}:null}function o(a,b){return d(function(a){return n(a,b)},a)||{params:{}}}function p(a){var b=(a.match(/:[a-zA-Z0-9-]+/g)||[]).map(function(a){return a.slice(1)});return{paramNames:b,route:a,regexp:new RegExp("^"+b.reduce(function(a,b){return a.replace(":"+b,"([^/?]+)")},a)+"$")}}function q(a,b){var c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],d=p(b);return d.page=a,d.prefix=c.prefix,d}function r(a,b){return a.map(function(a){var c=s(a,2),d=c[0],e=c[1];return q(d,e,b||{})})}var s=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();Object.defineProperty(c,"__esModule",{value:!0}),c.formatURL=g,c.getURL=i,c.toURLString=l,c.parseQueryString=m,c.match=n,c.getLocation=o,c.parseRoute=p,c.createRoute=q,c.createRoutes=r;var t=/(?:(?:(https?):)?\/\/([^:\/]+)(?::(\d+))?)?([^\?]*)(?:\?(.*))?/},{}],5:[function(a,b,c){"use strict";function d(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}function e(a){return Array.isArray(a)?a:Array.from(a)}function f(a){return a&&"undefined"!=typeof Symbol&&a.constructor===Symbol?"symbol":typeof a}function g(a){function b(a,b,c){var d=l(b);K("getData",d);var e=a.getData&&a.getData(d),g=++J;if(e&&e.then)return e.then(c);if(!(Array.isArray(e)&&e[0]&&e[0].then))return c(e);var h=function(){var a={isPartial:!0},b=0;return c(a),{v:Promise.all(e.map(function(d){return d.then(function(d){return J===g?(b+=1,b===e.length&&delete a.isPartial,Object.keys(d).forEach(function(b){return a[b]=d[b]}),c(a)):void 0})})).then(function(b){return D.emit("dataLoaded",a),b})}}();return"object"===("undefined"==typeof h?"undefined":f(h))?h.v:void 0}function c(a,b){return a.prepareData?(K("prepareData",b),a.prepareData(b)):(K("No prepareData, using raw page data",b.pageData),b.pageData)}function g(a,b,c){return A?(K("finalizeData",a,b,c),A(a,b,c)):a||{}}function m(){var a=g(c(I,l(H)),H.location,H.state.deref());return a.title&&(K("set page title",a.title),document.title=a.title),K("render",a),y(I.render,a),a}function n(a){H.state.swap(function(b){return Object.keys(a).reduce(function(b,c){return null===a[c]?delete b[c]:b[c]=a[c],b},b)})}function o(a){a.seedState&&n(a.seedState(l(H))||{})}function p(a){return b(a,H,function(b){return H.pageData=b,I=a,o(a),Promise.resolve(m())})}function q(a){"function"==typeof a&&(a=a(H.state.deref())),n(a),D.emit("updateState",H.state.deref())}function r(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];q(b);var c=h.getLocation(E,a);return K("loadURL",a,c.page,c.params,c.query),H.location=c,p(G[c.page]||G[404])}function s(a){if(a){for(var b=e(a),c=b[0],f=b.slice(1),g=arguments.length,h=Array(g>1?g-1:0),i=1;g>i;i++)h[i-1]=arguments[i];var j=f.concat(h),k=F.listeners(c);if(0===k.length)throw new Error("Tried to trigger action "+c+" ("+j+"), which has no handlers");return Promise.all(k.map(function(a){return a.apply(void 0,d(j))}))}}function t(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return q(a),p(I)}function u(){return h.toURLString(H.location)}function v(){return I?m():Promise.resolve()}function w(a){return q(a),v()}function x(a){if(!I)throw new Error("Cannot update query params before a page is loaded");return H.location.query=a,history.pushState({},"",u()),t()}var y=a.render,z=a.state,A=a.finalizeData,B=a.logger,C=a.prefix,D=new i.EventEmitter,E=[],F=new i.EventEmitter,G={};C=C||"";var H={state:j.createAtom(z||{})},I=void 0,J=0,K="undefined"==typeof B?k:function(){return B.log.apply(B,arguments)},L={};return{loadURL:r,triggerAction:s,refresh:t,getCurrentURL:u,rerender:v,on:D.on.bind(D),once:D.once.bind(D),off:D.removeListener.bind(D),getURL:function(){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];return h.getURL.apply(void 0,[E].concat(b))},addAction:function(a,b){F.on(a,function(){for(var a=arguments.length,c=Array(a),d=0;a>d;d++)c[d]=arguments[d];return b.apply(void 0,c.concat([l(H)]))})},performAction:function(a){return a?function(b){b&&b.preventDefault&&b.preventDefault(),s(a,b&&b.nativeEvent||b)}:null},addPage:function(a,b,c){E.push(h.createRoute(a,b,{prefix:C})),G[a]=c},start:function(){return window.onpopstate=function(){r(location.href)},r(location.href)},gotoURL:function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=H.location&&G[H.location.page];return c&&c.canUnload&&c.canUnload(l(H))===!1?v():(c&&c.onUnload&&q(c.onUnload(l(H))||{}),history.pushState({},"",a.replace(new RegExp("^("+C+")?"),C)),r(a,b))},updateQueryParams:function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return q(b),x(Object.keys(a).reduce(function(b,c){return b[c]=a[c],b},H.location.query))},clearQueryParams:function(){return x({})},updateState:w,flashState:function(a){var b=arguments.length<=1||void 0===arguments[1]?5e3:arguments[1];q(a);var c=(new Date).getTime()+b;Object.keys(a).forEach(function(a){return L[a]=c}),setTimeout(function(){var a=(new Date).getTime();w(Object.keys(L).reduce(function(b,c){return L[c]<=a&&(b[c]=null,delete L[c]),b},{}))},b)},getState:function(){return H.state.deref()},getLocation:function(a){return a?h.getLocation(E,a):H.location}}}Object.defineProperty(c,"__esModule",{value:!0}),c.createApp=g;var h=a("./router"),i=a("events"),j=a("js-atom"),k=function(a){return a},l=function(a){return{pageData:a.pageData,location:a.location,state:a.state.deref()}}},{"./router":4,events:2,"js-atom":3}]},{},[1])(1)});