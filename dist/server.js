"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _util = require("util");

var _errorHandler = require("./services/errorHandler");

var app = (0, _express["default"])(); // Body parser middleware

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
})); // Routes

app.use("/v1/authenticate", require("./routes/api/v1/authenticate"));
app.use("/v1/", require("./routes/api/v1/payments"));
app.use(_errorHandler.errorHandler);

var startServer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var port;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            port = process.env.port || 3000;
            _context.next = 3;
            return (0, _util.promisify)(app.listen).bind(app)(port);

          case 3:
            console.log("Server is running on port ".concat(port));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();