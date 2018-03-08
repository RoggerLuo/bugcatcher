'use strict';


module.exports = function (app) {
	
	app.use('/session', require('./session_router'));
	app.use('/account', require('./account_router'));
	app.use('/app', require('./application_router'));
	app.use('/bug', require('./bug_router'));

}