var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render('index', { title: 'Tracker' });
});

router.get("/profile", function(req, res){
  res.render('/profile', {
    title: 'Profile'
  });
});

module.exports = router;
