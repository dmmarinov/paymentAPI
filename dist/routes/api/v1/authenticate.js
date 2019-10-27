"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _auth = require("../../../services/auth");

var _errorHandler = require("../../../services/errorHandler");

var _authenticate = _interopRequireDefault(require("../../../validation/authenticate"));

var router = _express["default"].Router();

; // @route   POST v1/authenticate
// @desc    Get token
// @access  Private

router.post("/", [_authenticate["default"]],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var errors, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Get validation errors
            errors = (0, _expressValidator.validationResult)(req); // If validation error

            if (errors.isEmpty()) {
              _context.next = 5;
              break;
            }

            next(new _errorHandler.ValidationError());
            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return _auth.auth.generateToken(req, res, next);

          case 7:
            token = _context.sent;
            res.json({
              authToken: token.accessToken,
              expiresIn: token.accessTokenExpiresAt
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;