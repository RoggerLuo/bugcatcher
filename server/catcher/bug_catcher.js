!function(e){function t(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.charset="utf-8",n.src=p.p+""+e+"."+w+".hot-update.js",t.appendChild(n)}function n(e){if("undefined"==typeof XMLHttpRequest)return e(new Error("No browser support"));try{var t=new XMLHttpRequest,n=p.p+""+w+".hot-update.json";t.open("GET",n,!0),t.timeout=1e4,t.send(null)}catch(t){return e(t)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)e(new Error("Manifest request to "+n+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)e(new Error("Manifest request to "+n+" failed."));else{try{var r=JSON.parse(t.responseText)}catch(t){return void e(t)}e(null,r)}}}function r(e){function t(e,t){"ready"===x&&o("prepare"),_++,p.e(e,function(){function n(){_--,"prepare"===x&&(j[e]||u(e),0===_&&0===P&&l())}try{t.call(null,r)}finally{n()}})}var n=T[e];if(!n)return p;var r=function(t){return n.hot.active?T[t]?(T[t].parents.indexOf(e)<0&&T[t].parents.push(e),n.children.indexOf(t)<0&&n.children.push(t)):O=[e]:(console.warn("[HMR] unexpected require("+t+") from disposed module "+e),O=[]),p(t)};for(var i in p)Object.prototype.hasOwnProperty.call(p,i)&&(h?Object.defineProperty(r,i,function(e){return{configurable:!0,enumerable:!0,get:function(){return p[e]},set:function(t){p[e]=t}}}(i)):r[i]=p[i]);return h?Object.defineProperty(r,"e",{enumerable:!0,value:t}):r.e=t,r}function i(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],active:!0,accept:function(e,n){if("undefined"==typeof e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n;else t._acceptedDependencies[e]=n},decline:function(e){if("undefined"==typeof e)t._selfDeclined=!0;else if("number"==typeof e)t._declinedDependencies[e]=!0;else for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:c,apply:f,status:function(e){return e?void E.push(e):x},addStatusHandler:function(e){E.push(e)},removeStatusHandler:function(e){var t=E.indexOf(e);t>=0&&E.splice(t,1)},data:b[e]};return t}function o(e){x=e;for(var t=0;t<E.length;t++)E[t].call(null,e)}function a(e){var t=+e+""===e;return t?+e:e}function c(e,t){if("idle"!==x)throw new Error("check() is only allowed in idle status");"function"==typeof e?(m=!1,t=e):(m=e,t=t||function(e){if(e)throw e}),o("check"),n(function(e,n){if(e)return t(e);if(!n)return o("idle"),void t(null,null);A={},S={},j={};for(var r=0;r<n.c.length;r++)S[n.c[r]]=!0;g=n.h,o("prepare"),v=t,y={};var i=0;u(i),"prepare"===x&&0===_&&0===P&&l()})}function s(e,t){if(S[e]&&A[e]){A[e]=!1;for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(y[n]=t[n]);0===--P&&0===_&&l()}}function u(e){S[e]?(A[e]=!0,P++,t(e)):j[e]=!0}function l(){o("ready");var e=v;if(v=null,e)if(m)f(m,e);else{var t=[];for(var n in y)Object.prototype.hasOwnProperty.call(y,n)&&t.push(a(n));e(null,t)}}function f(t,n){function r(e){for(var t=[e],n={},r=t.slice();r.length>0;){var o=r.pop(),e=T[o];if(e&&!e.hot._selfAccepted){if(e.hot._selfDeclined)return new Error("Aborted because of self decline: "+o);if(0===o)return;for(var a=0;a<e.parents.length;a++){var c=e.parents[a],s=T[c];if(s.hot._declinedDependencies[o])return new Error("Aborted because of declined dependency: "+o+" in "+c);t.indexOf(c)>=0||(s.hot._acceptedDependencies[o]?(n[c]||(n[c]=[]),i(n[c],[o])):(delete n[c],t.push(c),r.push(c)))}}}return[t,n]}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];e.indexOf(r)<0&&e.push(r)}}if("ready"!==x)throw new Error("apply() is only allowed in ready status");"function"==typeof t?(n=t,t={}):t&&"object"==typeof t?n=n||function(e){if(e)throw e}:(t={},n=n||function(e){if(e)throw e});var c={},s=[],u={};for(var l in y)if(Object.prototype.hasOwnProperty.call(y,l)){var f=a(l),d=r(f);if(!d){if(t.ignoreUnaccepted)continue;return o("abort"),n(new Error("Aborted because "+f+" is not accepted"))}if(d instanceof Error)return o("abort"),n(d);u[f]=y[f],i(s,d[0]);for(var f in d[1])Object.prototype.hasOwnProperty.call(d[1],f)&&(c[f]||(c[f]=[]),i(c[f],d[1][f]))}for(var h=[],v=0;v<s.length;v++){var f=s[v];T[f]&&T[f].hot._selfAccepted&&h.push({module:f,errorHandler:T[f].hot._selfAccepted})}o("dispose");for(var m=s.slice();m.length>0;){var f=m.pop(),E=T[f];if(E){for(var P={},_=E.hot._disposeHandlers,j=0;j<_.length;j++){var A=_[j];A(P)}b[f]=P,E.hot.active=!1,delete T[f];for(var j=0;j<E.children.length;j++){var S=T[E.children[j]];if(S){var H=S.parents.indexOf(f);H>=0&&S.parents.splice(H,1)}}}}for(var f in c)if(Object.prototype.hasOwnProperty.call(c,f))for(var E=T[f],k=c[f],j=0;j<k.length;j++){var D=k[j],H=E.children.indexOf(D);H>=0&&E.children.splice(H,1)}o("apply"),w=g;for(var f in u)Object.prototype.hasOwnProperty.call(u,f)&&(e[f]=u[f]);var R=null;for(var f in c)if(Object.prototype.hasOwnProperty.call(c,f)){for(var E=T[f],k=c[f],N=[],v=0;v<k.length;v++){var D=k[v],A=E.hot._acceptedDependencies[D];N.indexOf(A)>=0||N.push(A)}for(var v=0;v<N.length;v++){var A=N[v];try{A(c)}catch(e){R||(R=e)}}}for(var v=0;v<h.length;v++){var U=h[v],f=U.module;O=[f];try{p(f)}catch(e){if("function"==typeof U.errorHandler)try{U.errorHandler(e)}catch(e){R||(R=e)}else R||(R=e)}}return R?(o("fail"),n(R)):(o("idle"),void n(null,s))}function p(t){if(T[t])return T[t].exports;var n=T[t]={exports:{},id:t,loaded:!1,hot:i(t),parents:O,children:[]};return e[t].call(n.exports,n,n.exports,r(t)),n.loaded=!0,n.exports}var d=this.webpackHotUpdate;this.webpackHotUpdate=function(e,t){s(e,t),d&&d(e,t)};var h=!1;try{Object.defineProperty({},"x",{get:function(){}}),h=!0}catch(e){}var v,y,g,m=!0,w="873180398b81b28b4a3e",b={},O=[],E=[],x="idle",P=0,_=0,j={},A={},S={},T={};return p.m=e,p.c=T,p.p="",p.h=function(){return w},r(0)(0)}([function(e,t,n){var r=n(1),i=n(2),o=n(3);!function(){var e={init:function(){r.APP_KEY=e.getAppKey(),window.onerror=e.launchErrInfo},getAppKey:function(){var t=document.getElementsByTagName("script");if(t.length<1)return"";var n=t[t.length-1];return n.src?e.getUrlParams(n.src).key||"":""},launchErrInfo:function(t,n,r,o,a){var c={message:t,name:"",stack:[],script:n,line:r,column:o};t&&"object"==typeof t?c=i.normalizeErr("","",0,0,t):a&&(c=i.normalizeErr(t,n,r,o,a)),e.reportErrInfo(c)},reportErrInfo:function(e){console.log(e),r.APP_KEY&&o.sendBug({data:e,success:function(e){console.log(e)},error:function(e){console.log(e)}})},getUrlParams:function(e){e=e?e:window.location.href;var t=e.split("?"),n=t[1];if(t.length>2&&(n=t[1]+"&"+t[2]),!n)return{};var r,i={};if(n.indexOf("&")>-1){r=n.split("&");for(var o=0;o<r.length;o++)i[r[o].split("=")[0]]=r[o].split("=")[1]}else{var a=n.substring(0,n.indexOf("=")),c=n.substr(n.indexOf("=")+1);i[a]=decodeURI(c)}return i}};e.init()}()},function(e,t){e.exports={SERVER_URL:"http://172.16.1.178:8787",APP_KEY:"",USER_ID:""}},function(e,t,n){"use strict";var r=n(1);e.exports={normalizeErr:function(e,t,n,i,o){var a={url:"",type:"",name:"",description:"",line:"",column:"",visitPage:{url:"",name:"",time:""},appId:r.APP_KEY},c={};if(a.description=o.stack,a.name=o.name,o.stack){var s=this.formatErrStack(o.stack);a.stack=s.outputArr,c=s.lineAddr||{}}else a.stack=[];return a.line=n||o.line||o.lineNumber||c.line||"",a.column=i||o.column||o.columnNumber||c.column||"",a.url=t||o.script||o.fileName||o.sourceURL||c.script||"",a.errText=this.stringifyText(o),a.visitPage.url=window.location.href,a.visitPage.name=document.title,a.visitPage.time=(new Date).getTime(),a},stringifyText:function(e){function t(e){return/["\\\x00-\x1f]/.test(e)&&(e=e.replace(/["\\\x00-\x1f]/g,function(e){var t=i[e];return t?t:(t=e.charCodeAt(),"\\u00"+Math.floor(t/16).toString(16)+(t%16).toString(16))})),'"'+e+'"'}function n(e){var t,n,r,i=["["],o=e.length;for(n=0;n<o;n++)switch(r=e[n],typeof r){case"undefined":case"function":case"unknown":break;default:t&&i.push(","),i.push(this.stringifyText(r)),t=1}return i.push("]"),i.join("")}if("JSON"in window)return JSON.stringify(e);var r=typeof e;if("object"!=r||null===e)return"string"==r&&(e='"'+e+'"'),String(e);var i={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};switch(typeof e){case"undefined":return"undefined";case"number":return isFinite(e)?String(e):"null";case"string":return t(e);case"boolean":return String(e);default:if(null===e)return"null";if(e instanceof Array)return n(e);var o,a,c=["{"],s=this.stringifyText;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u))switch(a=e[u],typeof a){case"undefined":case"unknown":case"function":break;default:o&&c.push(","),o=1,c.push(s(u)+":"+s(a))}return c.push("}"),c.join("")}},formatErrStack:function(e){function t(e){var t=e.split(":"),n=t.length,r=t.slice(0,n-2).join(":");return{line:t[n-2],column:t[n-1],script:r}}for(var n,r=e.split("\n"),i=[],o=!1,a=0;a<r.length;a++){var c=/((http|ftp|https|file):([^'"\s\u4E00-\u9FA5])+)/gi;if(c.test(r[a])&&!o){var s=r[a].replace(/^\s*/,"").replace(/\s*$/,"").replace(/^(at)\s+/,"").replace("(","").replace(")","").replace("@"," ").split(" "),u=s.length;if(1===u)i.push({functionName:"",errLocation:s[0]}),n=t(s[0]);else if(2===u)i.push({functionName:s[0],errLocation:s[1]}),n=t(s[1]);else{var l=s.splice(0,1);i.push({functionName:l.join(""),errLocation:s.join("")}),n=t(s.join(""))}o=!0}}return{outputArr:i,lineAddr:n}}}},function(e,t,n){function r(e){var t={url:o.SERVER_URL+e.path,type:"GET",dataType:"json",success:function(e,t){},error:function(e,t){}};for(var n in t){var r=t[n];e[n]||(e[n]=r)}i(e.type,e.url,e.data,e.success,e.error)}function i(e,t,n,r,i){var o=null;o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");var a=Math.random();"POST"!==e.toUpperCase()&&"PUT"!==e.toUpperCase()||n&&(n=JSON.stringify(n)),"GET"==e?(n?o.open("GET",t+"?"+n,!0):o.open("GET",t+"?t="+a,!0),o.send()):"POST"==e&&(o.open("POST",t,!0),o.setRequestHeader("Content-type","application/json"),o.send(n)),o.onreadystatechange=function(){if(4==o.readyState)if(200==o.status){var e=JSON.parse(o.responseText);r(e)}else i&&i(o.status)}}var o=n(1);e.exports={sendBug:function(e){e.path="/bug/"+o.APP_KEY,e.type="POST",r(e)}}}]);