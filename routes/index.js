var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  kk();
  res.render('index', { title: 'Week4 Express' });
});

module.exports = router;