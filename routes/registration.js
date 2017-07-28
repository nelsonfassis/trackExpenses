var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('registration', {title:"Registration"});
});

router.post('/', function(req, res, next) {
  req.checkBody('firstName', 'First name cannot be empty.').notEmpty();
  const errors = req.validationErrors();

  if (errors){
    console.log(`errors: ${JSON.stringify(errors)}`);
    res.render("registration", {title: "Registration Error"});
  }



  firstName = req.body.firstName;
  lastName = req.body.lastName;
  email = req.body.email;
  password = req.body.password;
  rePassword = req.body.rePassword;


  console.log(email);

  const db = require('../db.js');
  db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ' +
  '(?,?,?,?)',[firstName, lastName, email, password], function(error, results, fields){
    if (error) throw error;

    res.render('registration', {title:"Registration WORKED"});

  }
);

//  res.render('registration', {title:"Registration complete" });
});

module.exports = router;
