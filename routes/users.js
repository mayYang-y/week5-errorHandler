const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

// 取得所有 user
router.get('/', userController.getUsers);

module.exports = router;
