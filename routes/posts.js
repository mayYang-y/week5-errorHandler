const express = require('express');
const router = express.Router();
const postController = require('../controllers/postsController');
const handleErrorAsync = require("../util/handleErrorAsync");

// 取得所有 post
router.get('/', handleErrorAsync(postController.getPosts));

// 新增一筆 post
router.post('/', handleErrorAsync(postController.createPost));

module.exports = router;
