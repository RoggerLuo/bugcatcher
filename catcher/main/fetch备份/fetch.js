import Constants from "./constants";
import Tool from './tool';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.msg || {};
  } else {
    throwError(response);
  }
}

function throwError(response) {
  var info = {
    msg: response.msg,
    status: response.status
  }
  throw info;
}

function parseJSON(response) {
  return response.text().then((data)=>{
          if(data.length>0){
            response.msg = JSON.parse(data);
            return response;
          }else{
            return response;
          }
        }).catch(()=>{
          return response;
        })
}

function unescapeObj(object) {
}

/**
 * [filterUrlParams description]
 * @param  {[params]}  [description]
 * @return [String]    [过滤url的参数值为undefined、""等）]
 */
function filterUrlParams(params){
  let path = params.path;
  let obj = Tool.getUrlParams(path);
  if(obj){
    let keys = Object.keys(obj);
    for(let i in keys){
      if(!obj[keys[i]]||obj[keys[i]] == ""|| obj[keys[i]] =="undefined"||obj[keys[i]]=="null"){
        path = path.replace(keys[i]+ "=" +obj[keys[i]], "");
        path = path.replace("&" + keys[i]+ "=" +obj[keys[i]], "");
      }
    }
  }
  return path;
}

function handleFetch(params){
  // 允许get方法直接传url
  if (  typeof(params) == 'string'|| typeof(params) =='number') {
    params = {'path': params};
  };
  params.path = filterUrlParams(params);
  let time = new Date().getTime();
  let hash = '';
  if (params.path.indexOf('?') > -1) {
    hash = `&t=${time}`;
  } else {
    hash = `?t=${time}`;
  };
  params.path += hash;
  params.path = encodeURI(params.path);

  let option = {
    url: Constants.SERVER_URL + params.path,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": "Bearer " + (getItem('token') || ''),
    }
  };
  option = Object.assign({}, option, params)

  if (option.method.toUpperCase() === 'POST' || option.method.toUpperCase() === 'PUT') {
    if (option.body) {
      option.body = JSON.stringify(option.body);
    }
  }

  return fetch(option.url, option)
    .then(parseJSON)
    .then(checkStatus)
    .then(unescapeObj);
}

export default handleFetch;
