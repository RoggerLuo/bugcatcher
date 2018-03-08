
'use strict';

const co = require('co');
const HandleRes = require('../utils/handle_res');
const Validate = require('../utils/validate');
const AccountDao = require('../daos/account_dao');

const register = (req, res) => {
  const regenSession = function() {
    return new Promise((success, fail) => {
      req.session.regenerate(function(e) {
        if (e) {
          console.error('重新生成sid失败', e);
          fail(new Error('e_session'));
        } else {
          success();
        }
      });
    });
  };

  const client = HandleRes.getResFn(res);
  co(function*(){
    let rParams = [ 'username', 'mobile', 'password' ];
    yield Validate.isParamsLost(rParams,req.body);
    let register = yield AccountDao.register(req.body);
    console.log('----register----')
    console.log(register)
    yield regenSession()
    req.session.accountId = register._id;

    client.success();
  }).catch(client.fail);
};


const info = (req, res) => {
    const client = HandleRes.getResFn(res);
    co(function*(){

      if(!req.session.accountId){
          client.fail(new Error('e_log_out'));
          return;
      }

      client.success(req.session.account);
    }).catch(client.fail);
}

const logout = (req, res) => {
    const client = HandleRes.getResFn(res);
    co(function*(){
      // req.session.accountId = null;
      delete req.session.accountId
      delete req.session.account
      client.success();
    }).catch(client.fail);
}
const login = (req, res) => {
  const regenSession = function() {
    return new Promise((success, fail) => {
      req.session.regenerate(function(e) {
        if (e) {
          console.error('重新生成sid失败', e);
          fail(new Error('e_session'));
        } else {
          success();
        }
      });
    });
  };
  const client = HandleRes.getResFn(res);
  co(function*(){
    let rParams = [ 'mobile', 'password' ];
    let params = Object.assign({}, req.body, req.params);
    yield Validate.isParamsLost(rParams,params);
    let account = yield AccountDao.login(params);

    yield regenSession()
    req.session.accountId = account._id;
    req.session.account = account

    client.success(account);
  }).catch(client.fail);
};

module.exports = {
  register,
  login,
  logout,
  info
};
