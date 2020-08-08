"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var b = 'c';

var B = function B() {
  return /*#__PURE__*/_react["default"].createElement("div", null, "I am Big B");
};

var A = function A() {
  return b ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: b ? "" : "none"
    }
  }, /*#__PURE__*/_react["default"].createElement(B, {
    style: {
      display: b ? "" : "none"
    }
  }))) : null;
};

var F = function F() {
  var _this = this;

  console.log('this...Outer..', this);

  var f = function f() {
    console.log('this...inner..', _this);
  };

  return f;
};