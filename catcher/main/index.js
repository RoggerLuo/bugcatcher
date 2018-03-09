var Constants = require('./constants.js');
var Normalize = require('./normalize.js');
var Xhr = require('./xhr.js');
(function(){
  var Catcher = {
    init: function() {
      Constants.APP_KEY = Catcher.getAppKey();
      window.onerror = Catcher.launchErrInfo;
    },
    getAppKey: function() {
      var scripts = document.getElementsByTagName('script');
      if(scripts.length < 1)
        return '';
      var script = scripts[scripts.length-1];
      return !script.src ? '' : Catcher.getUrlParams(script.src).key || '';
    },
    launchErrInfo: function(errMsg, scriptURI, line, column, err) {
      debugger
      var errObj = {
        message: errMsg,
        name: '',
        stack: [],
        script: scriptURI,
        line: line,
        column: column
      };
      if (errMsg && typeof errMsg === 'object') {
        errObj = Normalize.normalizeErr('', '', 0, 0, errMsg);
      } else if (err) {
        errObj = Normalize.normalizeErr(errMsg, scriptURI, line, column, err);
      }
      Catcher.reportErrInfo(errObj);
    },
    reportErrInfo: function(errObj) {
      // 向服务器发送数据
      console.log(errObj)
      if(Constants.APP_KEY){
        Xhr.sendBug({
          data: errObj,
          success: function(res){
            console.log(res)
          },
          error: function(err){
            console.log(err)
          },
        });
      }
    },
    getUrlParams: function(fromUrl) {
      fromUrl = fromUrl ? fromUrl : window.location.href;
      var hash = fromUrl.split('?');
      var url = hash[1];
      if (hash.length > 2) {
        url = hash[1] + '&' + hash[2];
      }
      if (!url) return {};
      var query = {},
        strs;
      if (url.indexOf("&") > -1) {
        strs = url.split("&");
        for (var i = 0; i < strs.length; i++) {
          query[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      } else {
        var key = url.substring(0, url.indexOf("="));
        var value = url.substr(url.indexOf("=") + 1);
        query[key] = decodeURI(value);
      }
      return query;
    },
  };

  Catcher.init();
})()
