var Constants = require('./constants');

module.exports = {
	sendBug: function(params) {
    params.path = '/bug/' + Constants.APP_KEY;
    params.type = 'POST';
    init(params);
  },
};

function init(params){
	var defaults = {
    url: Constants.SERVER_URL + params.path,
    type: 'GET',
    dataType: 'json',
    success: function(request, status) {},
    error: function(request, status) {}
  }
  for(var key in defaults){
  	var val = defaults[key];
    if (!params[key]) {
      params[key] = val;
    }
  }
  request(params.type, params.url, params.data, params.success, params.error);
};

function request(type, url, data, success, error){
	// 创建ajax对象
	var xhr = null;
	if(window.XMLHttpRequest){
	  xhr = new XMLHttpRequest();
	} else {
	  xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}

	// 用于清除缓存
	var random = Math.random();
	if (type.toUpperCase() === 'POST' || type.toUpperCase() === 'PUT') {
    if (data) {
      data = JSON.stringify(data);
    }
  }

	if(type == 'GET'){
	  if(data){
      xhr.open('GET', url + '?' + data, true);
	  } else {
      xhr.open('GET', url + '?t=' + random, true);
	  }
	  xhr.send();

	} else if(type == 'POST'){
	  xhr.open('POST', url, true);
	  xhr.setRequestHeader("Content-type", "application/json");
	  xhr.send(data);
	}

	// 处理返回数据
	xhr.onreadystatechange = function(){
	  if(xhr.readyState == 4){
      if(xhr.status == 200){
      	var res = JSON.parse(xhr.responseText);
			  success(res);
			} else {
			  if(error){
		      error(xhr.status);
			  }
      }
	  }
	}
}