"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentsService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuidv = _interopRequireDefault(require("uuidv4"));

var _payments = require("../data/payments");

var validatePaymentId =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(paymentId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_uuidv["default"].is(paymentId)) {
              _context.next = 2;
              break;
            }

            throw new Error(500, "Invalid payment id");

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validatePaymentId(_x) {
    return _ref.apply(this, arguments);
  };
}();

var get =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(paymentId) {
    var payments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return validatePaymentId(paymentId);

          case 3:
            payments = _payments.data.payments.filter(function (payment) {
              // (For demo) Usually, here we would check that payment belongs to this user
              var isOwner = payment.payerId;
              return isOwner && payment.id === paymentId;
            });
            return _context2.abrupt("return", payments[0] ? Promise.resolve(payments[0]) : Promise.reject(new Error(404, "Payment is not found")));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function get(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updateStatus =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(payment, newStatus) {
    var index;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            index = 0; // Simulate search in DB

            _payments.data.payments.forEach(function (_payment, ind) {
              if (_payment.id === payment.id) {
                index = ind;
              }
            }); // Update status and updated date


            _payments.data.payments[index].status = newStatus;
            _payments.data.payments[index].updated = new Date();
            return _context3.abrupt("return", _payments.data.payments[index]);

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function updateStatus(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var paymentsService = {
  get: get,
  updateStatus: updateStatus
};
exports.paymentsService = paymentsService;