"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./Banner.css");
var _GlobalContext = require("../contexts/GlobalContext");
var _material = require("@mui/material");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function Banner() {
  var context = (0, _react.useContext)(_GlobalContext.AppContext);
  var loadingId = "loadingBar";
  var errorId = "errorBar";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    id: errorId
  }, context.errorMessage && /*#__PURE__*/_react.default.createElement(_material.Alert, {
    severity: "error"
  }, context.errorMessage)), /*#__PURE__*/_react.default.createElement("div", {
    id: loadingId
  }, context.loadingMessage && /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_material.LinearProgress, null)), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    style: {
      alignContent: "flex-end",
      textAlign: "right",
      paddingRight: "5px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, context.loadingMessage)))));
}
var _default = Banner;
exports.default = _default;