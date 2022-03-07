require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");



// get a single user
exports.get_user = async function (req, res) {
    User.findById(req.params.id, (err, user) => {
      if (err) res.json(err);
  
      res.json(user);
    });
};
  
// login
exports.login = function (req, res) {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          message: "Incorrect Username or Password",
          user,
        });
      }
  
      jwt.sign(
        { _id: user._id, username: user.username },
        process.env.SECRET,
        { expiresIn: "10m" },
        (err, token) => {
          if (err) return res.status(400).json(err);
          res.json({
            token: token,
            user: { _id: user._id, username: user.username },
          });
        }
      );
    })(req, res);
};
  
// Handle User sign-up form on POST
exports.signup = [
    //Validate and sanitize fields
  body('username', 'Please enter a username!')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('password', 'Password must be Admin Code!')
    .trim()
    .isLength({ min: 5 })
    .custom((value) => {
      if (value === process.env.ADMIN_CODE) {
        return true;
      } else {
        return false;
      }
    })
    .escape(),
  
    //Process request after val & san
  (req, res, next) => {
    console.log('validated user')
        //Extract errors from request
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json({ errors: errors.array() });
              
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) return next(err);
                     
            //Create new object with escaped and trimmed data
            var user = new User(
                {
                    username: req.body.username,
                    password: hashedPass
                })
                .save((err, user) => {
                    if (err) { return next(err) };
                    jwt.sign(
                        { _id: user._id, username: user.username },
                        process.env.SECRET,
                        { expiresIn: "5m" },
                        (err, token) => {
                          if (err) return next(err);
            
                          return res.status(200).json({
                            token,
                            user: {
                              _id: user._id,
                              username: user.username,
                            },
                            message: "Signup successful",
                        });
                    }
                );
            });
        }
    )}
]