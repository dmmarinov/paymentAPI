"use strict";

var _expressValidator = require("express-validator");

var validator = [(0, _expressValidator.check)("username", "Username is required").not().isEmpty(), (0, _expressValidator.check)("password", "Please enter a password with 6 or more characters").isLength({
  min: 6
})];
module.exports = validator;