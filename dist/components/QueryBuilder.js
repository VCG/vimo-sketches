"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _GlobalContext = require("../contexts/GlobalContext");
var _NodeFields = require("../config/NodeFields");
var _EdgeFields = require("../config/EdgeFields");
var _reactAwesomeQueryBuilder = require("react-awesome-query-builder");
var _mui = _interopRequireDefault(require("react-awesome-query-builder/lib/config/mui"));
require("react-awesome-query-builder/lib/css/styles.css");
require("react-awesome-query-builder/lib/css/compact_styles.css");
require("./QueryBuilder.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var InitialConfig = _mui.default;
delete InitialConfig["conjunctions"]["OR"];
InitialConfig["settings"]["showNot"] = false;
InitialConfig["settings"]["groupOperators"] = false;
InitialConfig["settings"]["canAddGroup"] = false;
InitialConfig["settings"]["canReorder"] = false;
InitialConfig["settings"]["renderSize"] = "small";
InitialConfig["settings"]["setOpOnChangeField"] = ["keep", "first"];
function QueryBuilder() {
  var _context$selectedSket, _context$selectedSket2;
  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    tree = _useState2[0],
    setTree = _useState2[1];
  var context = (0, _react.useContext)(_GlobalContext.AppContext);
  (0, _react.useEffect)(function () {
    var queryValue = {
      id: _reactAwesomeQueryBuilder.Utils.uuid(),
      type: "group"
    };
    setTree(_reactAwesomeQueryBuilder.Utils.checkTree(_reactAwesomeQueryBuilder.Utils.loadTree(queryValue), _objectSpread(_objectSpread({}, InitialConfig), {}, {
      fields: _NodeFields.NodeFields
    })));
  }, []);
  (0, _react.useEffect)(function () {
    var queryValue = {
      id: _reactAwesomeQueryBuilder.Utils.uuid(),
      type: "group"
    };
    if (context.selectedSketchElement && context.selectedSketchElement.type === "edge") {
      setTree(_reactAwesomeQueryBuilder.Utils.checkTree(_reactAwesomeQueryBuilder.Utils.loadTree(queryValue), _objectSpread(_objectSpread({}, InitialConfig), {}, {
        fields: _EdgeFields.EdgeFields
      })));
    } else {
      setTree(_reactAwesomeQueryBuilder.Utils.checkTree(_reactAwesomeQueryBuilder.Utils.loadTree(queryValue), _objectSpread(_objectSpread({}, InitialConfig), {}, {
        fields: _NodeFields.NodeFields
      })));
    }
  }, [context.selectedSketchElement]);
  var renderBuilder = function renderBuilder(props) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder-container",
      style: {
        padding: 0,
        minWidth: 300
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "query-builder qb-lite",
      style: {
        margin: 0
      }
    }, /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Builder, props)));
  };
  var onChange = function onChange(immutableTree, config) {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    // this.setState({, config: config});
    var query = _reactAwesomeQueryBuilder.Utils.mongodbFormat(immutableTree, config);
    setTree(immutableTree);
    var updatedElem = _objectSpread(_objectSpread({}, context.selectedSketchElement), {}, {
      tree: immutableTree,
      properties: query
    });
    context.setSelectedSketchElement(updatedElem);
  };
  return /*#__PURE__*/_react.default.createElement("div", null, tree && (context === null || context === void 0 ? void 0 : (_context$selectedSket = context.selectedSketchElement) === null || _context$selectedSket === void 0 ? void 0 : _context$selectedSket.type) === "node" && /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Query, _extends({}, InitialConfig, {
    fields: _NodeFields.NodeFields,
    value: context.selectedSketchElement.tree || tree,
    onChange: onChange,
    renderBuilder: renderBuilder
  })), tree && (context === null || context === void 0 ? void 0 : (_context$selectedSket2 = context.selectedSketchElement) === null || _context$selectedSket2 === void 0 ? void 0 : _context$selectedSket2.type) === "edge" && /*#__PURE__*/_react.default.createElement(_reactAwesomeQueryBuilder.Query, _extends({}, InitialConfig, {
    fields: _EdgeFields.EdgeFields,
    value: context.selectedSketchElement.tree || tree,
    onChange: onChange,
    renderBuilder: renderBuilder
  })));
}
var _default = QueryBuilder;
exports.default = _default;