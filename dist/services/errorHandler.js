"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.CancelError = exports.ApproveError = exports.ValidationError = exports.TokenExpiredError = exports.UnauthorizeError = exports.ExtendedError = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var ExtendedError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2["default"])(ExtendedError, _Error);

  function ExtendedError(status, code, message) {
    var _this;

    (0, _classCallCheck2["default"])(this, ExtendedError);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ExtendedError).call(this));
    _this.message = message || "Oops, something went wrong.";
    _this.code = code || "INTERNAL_SERVER_ERR";
    _this.status = status || 500;
    return _this;
  }

  return ExtendedError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.ExtendedError = ExtendedError;

var UnauthorizeError =
/*#__PURE__*/
function (_ExtendedError) {
  (0, _inherits2["default"])(UnauthorizeError, _ExtendedError);

  function UnauthorizeError(message) {
    (0, _classCallCheck2["default"])(this, UnauthorizeError);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(UnauthorizeError).call(this, 401, "ERR_UNAUTHORIZED", message || "Token is not provided"));
  }

  return UnauthorizeError;
}(ExtendedError);

exports.UnauthorizeError = UnauthorizeError;

var TokenExpiredError =
/*#__PURE__*/
function (_ExtendedError2) {
  (0, _inherits2["default"])(TokenExpiredError, _ExtendedError2);

  function TokenExpiredError(message) {
    (0, _classCallCheck2["default"])(this, TokenExpiredError);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TokenExpiredError).call(this, 401, "ERR_AUTH_TOKEN_EXPIRED", message || "Token has expired"));
  }

  return TokenExpiredError;
}(ExtendedError);

exports.TokenExpiredError = TokenExpiredError;

var ValidationError =
/*#__PURE__*/
function (_ExtendedError3) {
  (0, _inherits2["default"])(ValidationError, _ExtendedError3);

  function ValidationError(message, details) {
    var _this2;

    (0, _classCallCheck2["default"])(this, ValidationError);
    _this2 = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ValidationError).call(this, 400, "ERR_VALIDATION", message || "Validation Failed"));

    if (details) {
      _this2.details = details;
    }

    return _this2;
  }

  return ValidationError;
}(ExtendedError);

exports.ValidationError = ValidationError;

var ApproveError =
/*#__PURE__*/
function (_ExtendedError4) {
  (0, _inherits2["default"])(ApproveError, _ExtendedError4);

  function ApproveError(message) {
    (0, _classCallCheck2["default"])(this, ApproveError);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ApproveError).call(this, 400, "ERR_CANNOT_APPROVE", message || "Cannot approve a payment that has already been cancelled"));
  }

  return ApproveError;
}(ExtendedError);

exports.ApproveError = ApproveError;

var CancelError =
/*#__PURE__*/
function (_ExtendedError5) {
  (0, _inherits2["default"])(CancelError, _ExtendedError5);

  function CancelError(message) {
    (0, _classCallCheck2["default"])(this, CancelError);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CancelError).call(this, 400, "ERR_CANNOT_CANCEL", message || "Cannot cancel a payment that has already been approved"));
  }

  return CancelError;
}(ExtendedError);

exports.CancelError = CancelError;

var errorHandler = function errorHandler(err, req, res, next) {
  if (err instanceof ExtendedError) {
    var errObject = {
      code: err.code,
      message: err.message
    };

    if (err.details) {
      errObject.details = err.details;
    }

    res.status(err.status).send(errObject);
    return;
  }

  next(err);
};

exports.errorHandler = errorHandler;