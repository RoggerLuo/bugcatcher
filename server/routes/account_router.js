'use strict';

const express = require('express');
const router = express.Router();
const accountApp = require('../apps/account_app');

router.post('/register', accountApp.register);
router.post('/:mobile', accountApp.login);
router.get('/logout', accountApp.logout);
router.get('/info', accountApp.info);

module.exports = router;