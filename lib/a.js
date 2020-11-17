"use strict";

function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}

var f = function f() {
  var a = function a() {
    return console.log(history);
  };

  var history = 1;
  return a;
};

var f1 = function f1() {
  var a = history;
  var history = 1;
  return a;
};

f();
f1();