"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _oauth2Server = _interopRequireDefault(require("oauth2-server"));

var _errorHandler = require("../services/errorHandler");

var oauth2 = new _oauth2Server["default"]({
  model: require("../data/models/authModel"),
  accessTokenLifetime: 3600,
  allowBearerTokensInQueryString: true
});

var generateToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var request, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            req.body.client_id = "clientIdExample";
            req.body.client_secret = "clientSecretExample";
            req.body.grant_type = "password";
            request = new _oauth2Server["default"].Request(req), response = new _oauth2Server["default"].Response(res);
            _context.next = 7;
            return oauth2.token(request, response);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            next(new _errorHandler.UnauthorizeError());

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function generateToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

function authenticateToken(_x4, _x5, _x6) {
  return _authenticateToken.apply(this, arguments);
}

function _authenticateToken() {
  _authenticateToken = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var request, response, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (req.headers['authorization']) {
              _context2.next = 4;
              break;
            }

            next(new _errorHandler.UnauthorizeError());
            return _context2.abrupt("return");

          case 4:
            request = new _oauth2Server["default"].Request(req), response = new _oauth2Server["default"].Response(res);
            _context2.next = 7;
            return oauth2.authenticate(request, response);

          case 7:
            token = _context2.sent;
            next();
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            next(new _errorHandler.TokenExpiredError());

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _authenticateToken.apply(this, arguments);
}

var auth = {
  generateToken: generateToken,
  authenticateToken: authenticateToken
};
exports.auth = auth;