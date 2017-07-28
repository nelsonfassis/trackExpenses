var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('registration', {title:"Registration"});
});

router.post('/', function(req, res, next) {
  res.render('registration', {title:"Registration complete" });
});

module.exports = router;
