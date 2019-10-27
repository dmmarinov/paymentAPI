import { check } from "express-validator";

 const validator = [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
];

module.exports = validator;