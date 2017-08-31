var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

var passport = require('passport');

var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function(req, res, next) {
  res.render('registration', {
    title:"Registration",
    errors: false});
});

router.post('/', function(req, res, next) {
  req.checkBody('firstName', 'First name cannot be empty.').notEmpty();
  req.checkBody('firstName', 'First name must be between 2-15 characters long.').len(2, 15);
  req.checkBody('lastName', 'First name cannot be empty.').notEmpty();
  req.checkBody('lastName', 'First name must be between 2-15 characters long.').len(2, 15);
  req.checkBody('email', "Please insert a valid email address").isEmail();
  req.checkBody('email', "Please insert a valid email address").len(4,50);
  req.checkBody('password', "Password must be betwenn 8-100 characters").len(8,100);
  req.checkBody("password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/);
  req.checkBody('rePassword',"Passwords do not match").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors){
    console.log(`errors: ${JSON.stringify(errors)}`);
    console.log(errors);
    res.render("registration", {
      title: "Registration Error",
      errors: errors
    });
  }

  else{

      firstName = req.body.firstName;
      lastName = req.body.lastName;
      email = req.body.email;
      password = req.body.password;
      rePassword = req.body.rePassword;

      const db = require('../db.js');

      bcrypt.hash(password, saltRounds, function(err, hash){
        db.query('INSERT INTO users (first_name, last_name, email, password) VALUES ' +
        '(?,?,?,?)',[firstName, lastName, email, hash], function(error, results, fields){
          if (error) throw error;

          db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields){
            if (error) throw error;

            const user_id = results[0];

            console.log(results[0]);
            req.login(user_id, function(err){
              res.redirect('/');
            });

            res.render('registration', {
              title:"Registration WORKED",
              errors: false});
          })
        }
      );
      })
  }
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
  });

module.exports = router;
