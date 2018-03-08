'use strict';

import Constants from './constants.js';
import Tool from './tool.js';
import Xhr from './xhr.js';

export default () => {
	let urlInfo = Tool.getUrlParams();
	console.log(urlInfo)
	Constants.USER_ID = urlInfo.user_id || '';
	let loginInfo = {
		domainId: urlInfo.domain_id,
		orgId: urlInfo.org_id,
		ticket: urlInfo.ticket,
	};
	Xhr.login(loginInfo)
		.then(function(res){
			console.log(res)
		}, function(err){
			console.log(err)
		})
};