
module.exports = {
  getUrlParams:  function(fromUrl) {
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