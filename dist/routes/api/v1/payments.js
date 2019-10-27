"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _uuidv = _interopRequireDefault(require("uuidv4"));

var _payments = require("../../../data/payments");

var _payments2 = require("../../../services/payments");

var _auth = require("../../../services/auth");

var _errorHandler = require("../../../services/errorHandler");

var router = _express["default"].Router(); // @route   GET v1/payments
// @desc    List of all payments
// @access  Private


router.get("/payments", _auth.auth.authenticateToken,
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var payments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              payments = _payments.data.payments.filter(function (payment) {
                // Usually we would check to get a data for particular user (return payment.userId === userId)
                // But this is a test project :)
                return payment;
              });
              res.status(200).send(payments);
            } catch (err) {
              next(err);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // @route   POST v1/payments
// @desc    Create payment
// @access  Private

router.post("/payments", _auth.auth.authenticateToken,
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var body, details, currentExchangeRate;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = req.body;

            if (!(typeof body.amount !== "number")) {
              _context2.next = 6;
              break;
            }

            details = {
              message: body.amount ? "amount field is invalid" : "'amount' field is required",
              "path": ["amount"],
              "value": body.amount
            };
            next(new _errorHandler.ValidationError(null, details));
            return _context2.abrupt("return");

          case 6:
            // Generate id with uuid()
            body.id = (0, _uuidv["default"])(); // If payment system is "ingenico" process through YandexMoney

            if (body.paymentSystem === "ingenico") {
              body.paymentSystem = "yandexMoney";
            } // If paid with Mastercard -> use "PMB" payment method


            if (body.paymentMethod === "mastercard") {
              body.paymentMethod = "PMB";
            } // Convert USD payments to Rub


            if (body.currency === "USD") {
              currentExchangeRate = 64.22;
              body.currency = "RUB";
              body.amount = Math.ceil(body.amount * currentExchangeRate * 100) / 100;
            }

            body.status = "created"; // Mark payment status as created
            // Just placeholder when no comment

            if (!body.comment) {
              body.comment = null;
            } // Set created and updated time


            body.created = new Date();
            body.updated = new Date(); // Push to payments list

            _payments.data.payments.push(body);

            res.status(201).json(body);
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()); // @route   GET v1/payment/:id
// @desc    Get payment by id
// @access  Private

router.get("/payment/:id", _auth.auth.authenticateToken,
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res, next) {
    var paymentId, payment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            paymentId = req.params.id;
            _context3.next = 4;
            return _payments2.paymentsService.get(paymentId);

          case 4:
            payment = _context3.sent;
            res.json(payment);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()); // @route   PUT v1/payments/:id/approve
// @desc    Approve payment
// @access  Private

router.put("/payments/:id/approve", _auth.auth.authenticateToken,
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(req, res, next) {
    var paymentId, payment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            paymentId = req.params.id;
            _context4.next = 4;
            return _payments2.paymentsService.get(paymentId);

          case 4:
            payment = _context4.sent;

            if (!(payment.status === "cancelled")) {
              _context4.next = 7;
              break;
            }

            throw new _errorHandler.ApproveError();

          case 7:
            _context4.next = 9;
            return _payments2.paymentsService.updateStatus(payment, "approved");

          case 9:
            res.status(200).send();
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}()); // @route   PUT v1/payments/:id/cancel
// @desc    Cancel payment
// @access  Private

router.put("/payments/:id/cancel", _auth.auth.authenticateToken,
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(req, res, next) {
    var paymentId, payment;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            paymentId = req.params.id;
            _context5.next = 4;
            return _payments2.paymentsService.get(paymentId);

          case 4:
            payment = _context5.sent;

            if (!(payment.status === "approved")) {
              _context5.next = 7;
              break;
            }

            throw new _errorHandler.CancelError();

          case 7:
            _context5.next = 9;
            return _payments2.paymentsService.updateStatus(payment, "cancelled");

          case 9:
            res.status(200).send();
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;