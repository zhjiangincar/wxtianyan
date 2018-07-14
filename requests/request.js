var api = require('./api.js');
var utils = require('../utils/util.js');

var header = {
  'Accept': 'application/json',
  'content-type': 'application/json',
  'Authorization': null,
} 

/**
 * 网路请求
 */
function request(url, method, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success: function (res) {
      utils.isFunction(successCb) && successCb(res);
    },
    error: function (error) {
      utils.isFunction(errorCb) && errorCb(error);
    },
    complete: function (res) {
      utils.isFunction(completeCb) && completeCb(res);
    }
  });
}

/**
 * 提交
 */
const container = (data, successCb, errorCb, completeCb) => {
  request(api.API_TY_Container,'POST', data, successCb, errorCb, completeCb);
}

/**
 * 获取
 */
// function requestBookDokDetail(id, data, successCb, errorCb, completeCb) {
//   request(api.API_BOOK_DETAIL.replace(':id', id), data, successCb, errorCb, completeCb);
// }



module.exports = {
  container: container
}

