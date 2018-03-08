'use strict';

import fetch from './fetch';
import Constants from './constants';

export default {
	sendBug(data) {
    let params = {
      path: '/bug/' + Constants.APP_KEY,
      method: 'POST',
      body: data
    };
    return fetch(params);
  },
	login(data) {
    let params = {
      path: '/session/' + Constants.USER_ID,
      method: 'POST',
      body: data
    };
    return fetch(params);
  },
};