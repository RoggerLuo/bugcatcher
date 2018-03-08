'use strict';

var Constants = require('./constants.js');

module.exports = {
	normalizeErr: function(msg, scriptURI, line, column, err) {
    var errObj = {
      url: '',
      type: '',
      name: '',
      description: '',
      line: '',
      column: '',
      visitPage: {
        url: '',
        name: '',
        time: '',
      },
      appId: Constants.APP_KEY,
    };
    var lineAddr = {};
    errObj.description = err.stack //msg || err.msg || '';
    errObj.name = err.name;
    // debugger
    // console.log('err err errerrerrerr err')
    // console.log(err)
    if (err.stack) {
      var stackErr = this.formatErrStack(err.stack);
      errObj.stack = stackErr.outputArr;
      lineAddr = stackErr.lineAddr || {};
    } else {
      errObj.stack = [];
    }
    // debugger

    errObj.line = line || err.line || err.lineNumber || lineAddr.line || '';
    errObj.column = column || err.column || err.columnNumber || lineAddr.column || '';
    errObj.url = scriptURI || err.script || err.fileName || err.sourceURL || lineAddr.script || '';
    errObj.errText = this.stringifyText(err);
    errObj.visitPage.url = window.top.location.href;
    errObj.visitPage.name = document.title;
    errObj.visitPage.time = new Date().getTime();
    return errObj;
  },
  stringifyText: function(source) {
    if ("JSON" in window) {
      return JSON.stringify(source);
    }
    var type = typeof(source);
    if (type != "object" || source === null) {
      if (type == "string") {
        source = '"' + source + '"';
      }
      return String(source);
    } else {
      var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"': '\\"',
        "\\": '\\\\'
      };

      function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(/["\\\x00-\x1f]/g, function (match) {
                var value = escapeMap[match];
                if (value) {
                    return value;
                }
                value = match.charCodeAt();
                return "\\u00" + Math.floor(value / 16).toString(16) + (value % 16).toString(16);
            })
        }
        return '"' + source + '"';
      }

      function encodeArray(source) {
        var result = ["["];
        var len = source.length;
        var preComma;
        var i;
        var item;
        for (i = 0; i < len; i++) {
            item = source[i];
            switch (typeof item) {
                case "undefined":
                case "function":
                case "unknown":
                    break;
                default:
                    if (preComma) {
                        result.push(",");
                    }
                    result.push(this.stringifyText(item));
                    preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
      }

      switch (typeof source) {
        case "undefined":
          return "undefined";
        case "number":
          return isFinite(source) ? String(source) : "null";
        case "string":
          return encodeString(source);
        case "boolean":
          return String(source);
        default:
          if (source === null) {
            return "null";
          }
          else {
            if (source instanceof Array) {
              return encodeArray(source);
            }
            else {
              var result = ["{"];
              var encode = this.stringifyText;
              var preComma;
              var item;
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  item = source[key];
                  switch (typeof item) {
                    case "undefined":
                    case "unknown":
                    case "function":
                      break;
                    default:
                      if (preComma) {
                        result.push(",");
                      }
                      preComma = 1;
                      result.push(encode(key) + ":" + encode(item));
                  }
                }
              }
              result.push("}");
              return result.join("");
            }
          }
      }
    }
  },
  formatErrStack: function(input) {
    var inputArr = input.split('\n');
    var outputArr = [];
    var lineAddr;
    var firstFlag = false;

    function parseLineandCol(inputStr) {
      var parseArr = inputStr.split(':');
      var len = parseArr.length;
      var script = parseArr.slice(0, len-2).join(':');
      return {
        line: parseArr[len-2],
        column: parseArr[len-1],
        script: script
      };
    }

    for (var i = 0; i < inputArr.length; i++) {
      var regexp = /((http|ftp|https|file):([^'"\s\u4E00-\u9FA5])+)/ig;
      if (regexp.test(inputArr[i]) && !firstFlag) {
        // 去除首尾空格，再去除 方法名称前面的 "at " 去除"(",")" （IE9+、chrome）
        //  最后将"@" 替换成空格，并以空格作为分隔符
        var items = inputArr[i].replace(/^\s*/, '')
          .replace(/\s*$/, '')
          .replace(/^(at)\s+/, '')
          .replace('(', '')
          .replace(')', '')
          .replace('@', ' ')
          .split(' ');
        var len = items.length;

        if (len === 1) {
          outputArr.push({
            functionName: '',
            errLocation: items[0]
          });
          lineAddr = parseLineandCol(items[0]);
        } else if (len === 2) {
          outputArr.push({
            functionName: items[0],
            errLocation: items[1]
          });
          lineAddr = parseLineandCol(items[1]);
        } else {
          var functionName = items.splice(0, 1);
          outputArr.push({
            functionName: functionName.join(''),
            errLocation: items.join('')
          });
          lineAddr = parseLineandCol(items.join(''));
        }
        firstFlag = true;
      }
    };
    return {
      outputArr: outputArr,
      lineAddr: lineAddr
    };
  },
};