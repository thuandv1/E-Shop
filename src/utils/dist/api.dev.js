"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.post = exports.get = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _LoginContext = require("Context/LoginContext");

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: 'http://localhost:8080/laravel/public/api/'
});

var get = function get(path) {
  var options,
      res,
      _args = arguments;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 3;
          return regeneratorRuntime.awrap(api.get(path, options));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.get = get;

var post = function post(path) {
  var datas,
      config,
      res,
      _args2 = arguments;
  return regeneratorRuntime.async(function post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          datas = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          config = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
          _context2.next = 4;
          return regeneratorRuntime.awrap(api.post(path, datas, config));

        case 4:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.post = post;
var _default = api;
exports["default"] = _default;
console.log('thuandv1');