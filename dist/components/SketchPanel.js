"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./SketchPanel.css");
var _QueryBuilder = _interopRequireDefault(require("./QueryBuilder"));
var _CircleTwoTone = _interopRequireDefault(require("@mui/icons-material/CircleTwoTone"));
var _ArrowRightAlt = _interopRequireDefault(require("@mui/icons-material/ArrowRightAlt"));
var _Edit = _interopRequireDefault(require("@mui/icons-material/Edit"));
var _Delete = _interopRequireDefault(require("@mui/icons-material/Delete"));
var _Info = _interopRequireDefault(require("@mui/icons-material/Info"));
var _paper = _interopRequireDefault(require("paper"));
var _GlobalContext = require("../contexts/GlobalContext");
var _lodash = _interopRequireDefault(require("lodash"));
var _material = require("@mui/material");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _reactAwesomeQueryBuilder = require("react-awesome-query-builder");
var _axios = _interopRequireDefault(require("axios"));
var _edge = require("../utils/edge");
var _mui = _interopRequireDefault(require("react-awesome-query-builder/lib/config/mui"));
var _NodeFields = require("../config/NodeFields");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
function SketchPanel() {
  var sketchPanelId = "sketch-panel";
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    nodes = _useState2[0],
    setNodes = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    nodeLabels = _useState4[0],
    setNodeLabels = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    edges = _useState6[0],
    setEdges = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    importData = _useState8[0],
    setImportData = _useState8[1];
  var _useState9 = (0, _react.useState)(false),
    _useState10 = _slicedToArray(_useState9, 2),
    nodeImportUpdate = _useState10[0],
    setNodeImportUpdate = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    edgeImportUpdate = _useState12[0],
    setEdgeImportUpdate = _useState12[1];
  // States are node (add nodes), edge (add edges), edit(change node/edge properties)
  var _useState13 = (0, _react.useState)("node"),
    _useState14 = _slicedToArray(_useState13, 2),
    mouseState = _useState14[0],
    setMouseState = _useState14[1];
  var _useState15 = (0, _react.useState)(false),
    _useState16 = _slicedToArray(_useState15, 2),
    showInfo = _useState16[0],
    setShowInfo = _useState16[1];
  var _useState17 = (0, _react.useState)("crosshair"),
    _useState18 = _slicedToArray(_useState17, 2),
    cursor = _useState18[0],
    setCursor = _useState18[1];
  var _useState19 = (0, _react.useState)(),
    _useState20 = _slicedToArray(_useState19, 2),
    pencil = _useState20[0],
    setPencil = _useState20[1];
  // Checks for mouse intersections
  var _useState21 = (0, _react.useState)(),
    _useState22 = _slicedToArray(_useState21, 2),
    testCircle = _useState22[0],
    setTestCircle = _useState22[1];
  // Edit properties with boolean query builder
  var _React$useState = _react.default.useState(),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    popperLocation = _React$useState2[0],
    setPopperLocation = _React$useState2[1];
  var _React$useState3 = _react.default.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showPopper = _React$useState4[0],
    setShowPopper = _React$useState4[1];
  var circleRadius = 20;
  var currentPath;
  var currentNode;
  var currentSelection;
  var _useState23 = (0, _react.useState)({}),
    _useState24 = _slicedToArray(_useState23, 2),
    canvasDimension = _useState24[0],
    setCanvasDimension = _useState24[1];

  // We track the overall motif in the global context
  var context = (0, _react.useContext)(_GlobalContext.AppContext);
  var getMotifCount = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(motif) {
      var url;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // get request to backend to get motif count
            url = "".concat(process.env.REACT_APP_API_PROTOCOL, "://").concat(process.env.REACT_APP_API_URL, "/count/motif=").concat(motif);
            _context.next = 3;
            return _axios.default.get(url);
          case 3:
            return _context.abrupt("return", _context.sent.data);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getMotifCount(_x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var getRelativeMotifCount = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(motif) {
      var url;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            // get request to backend to get motif count
            url = "".concat(process.env.REACT_APP_API_PROTOCOL, "://").concat(process.env.REACT_APP_API_URL, "/rel_count/motif=").concat(motif);
            _context2.next = 3;
            return _axios.default.get(url);
          case 3:
            return _context2.abrupt("return", _context2.sent.data);
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function getRelativeMotifCount(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  var calculateNewPosition = function calculateNewPosition(dimension, position) {
    var newX = canvasDimension.width / dimension.width * position[1];
    var newY = canvasDimension.height / dimension.height * position[2];
    return [Math.floor(newX), Math.floor(newY)];
  };
  var getPositionTransformedData = function getPositionTransformedData(data) {
    var newNodes = data.nodes.map(function (node) {
      var _calculateNewPosition = calculateNewPosition(data.dimension, node.position),
        _calculateNewPosition2 = _slicedToArray(_calculateNewPosition, 2),
        newX = _calculateNewPosition2[0],
        newY = _calculateNewPosition2[1];
      return _objectSpread(_objectSpread({}, node), {}, {
        position: ["Point", newX, newY]
      });
    });
    var newData = _objectSpread(_objectSpread({}, data), {}, {
      nodes: newNodes,
      dimension: canvasDimension
    });
    return newData;
  };
  var importMotif = function importMotif() {
    console.log("importing motif");
    clearSketch(); // clear sketch
    // import file using file picker
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = function (e) {
      var file = e.target.files[0];
      // parse file to object
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (e) {
        var data = JSON.parse(e.target.result);
        var newData = getPositionTransformedData(data);
        setImportData(newData);
        setNodeImportUpdate(true);
      };
    };
    fileInput.click();
  };
  var exportMotif = function exportMotif() {
    console.log("exporting motif");
    console.log(nodes);
    console.log(edges);
    var out = getEncodedMotif(nodes, edges);
    // download out as JSON file
    var json = JSON.stringify(out);
    var blob = new Blob([json], {
      type: "application/json"
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "motif.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  var clearSketch = function clearSketch() {
    var _paper$project, _paper$project$active, _paper$view;
    console.log("Clearing");
    _paper.default === null || _paper.default === void 0 ? void 0 : (_paper$project = _paper.default.project) === null || _paper$project === void 0 ? void 0 : (_paper$project$active = _paper$project.activeLayer) === null || _paper$project$active === void 0 ? void 0 : _paper$project$active.removeChildren();
    _paper.default === null || _paper.default === void 0 ? void 0 : (_paper$view = _paper.default.view) === null || _paper$view === void 0 ? void 0 : _paper$view.draw();
    // Remove all edges and nodes
    setNodes([]);
    setEdges([]);
  };
  var deleteSketchElement = function deleteSketchElement() {
    // edges
    if (context.selectedSketchElement && context.selectedSketchElement.type === "edge") {
      var _context$selectedSket;
      var newEdges = edges.filter(function (edge) {
        return edge.label !== context.selectedSketchElement.label;
      });
      context.selectedSketchElement.edgeLine.remove();
      context.selectedSketchElement.lineGroup.remove();
      (_context$selectedSket = context.selectedSketchElement.propertyLabel) === null || _context$selectedSket === void 0 ? void 0 : _context$selectedSket.remove();
      context.setSelectedSketchElement(null);
      setEdges(newEdges);
    }

    // nodes
    if (context.selectedSketchElement && context.selectedSketchElement.type === "node") {
      // find adjacent edges
      var nodeLabel = context.selectedSketchElement.label;
      var adjacentEdges = edges.filter(function (edge) {
        if (edge.fromNode.label === nodeLabel || edge.toNode.label === nodeLabel) {
          return edge;
        }
      });

      // delete edges from canvas
      adjacentEdges.map(function (edge) {
        var _edge$propertyLabel;
        edge.edgeLine.remove();
        edge.lineGroup.remove();
        (_edge$propertyLabel = edge.propertyLabel) === null || _edge$propertyLabel === void 0 ? void 0 : _edge$propertyLabel.remove();
      });

      // delete node from canvas
      var selectedNodeLabel = context.selectedSketchElement.label;
      context.selectedSketchElement.circle.remove();
      context.selectedSketchElement.circleGroup.remove();
      context.setSelectedSketchElement(null);

      // delete node and rename remaining nodes
      var newNodes = nodes.filter(function (node) {
        return node.label !== selectedNodeLabel;
      }).map(function (node, i) {
        return renameCircle(node.circle, i, node.properties, "tree" in node ? node.tree : null, node.label);
      });
      var getNewNode = function getNewNode(previousLabel) {
        return newNodes.find(function (node) {
          return node.previousLabel === previousLabel;
        });
      };

      // delete adjacent edges
      var _newEdges = edges.filter(function (edge) {
        return !adjacentEdges.includes(edge);
      }).map(function (edge) {
        var newFromNode = getNewNode(edge.fromNode.label);
        var newToNode = getNewNode(edge.toNode.label);
        var newNodeIndices = [_lodash.default.findLastIndex(newNodes, newFromNode), _lodash.default.findLastIndex(newNodes, newToNode)];
        return renameEdge(newFromNode, newToNode, newNodeIndices, edge);
      });
      console.log(_newEdges, newNodes);

      // reset edges and nodes
      setEdges(_newEdges);
      setNodes(newNodes);
    }
  };
  var renameEdge = function renameEdge(fromNode, toNode, nodeIndices, edge) {
    var tree = "tree" in edge ? edge.tree : null;
    var edgeObj = _objectSpread({}, edge);
    edgeObj["fromNode"] = fromNode;
    edgeObj["toNode"] = toNode;
    edgeObj["indices"] = nodeIndices;
    edgeObj["label"] = "".concat(fromNode.label, " -> ").concat(toNode.label);
    if (tree !== null) {
      edgeObj["tree"] = _reactAwesomeQueryBuilder.Utils.loadTree(tree);
    } else {
      edgeObj["tree"] = tree;
    }
    return edgeObj;
  };
  var renameCircle = function renameCircle(circle, index) {
    var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var tree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var previousLabel = arguments.length > 4 ? arguments[4] : undefined;
    circle.fillColor = context.neuronColors[index];
    var textPoint = [circle.position.x, circle.position.y + 7];
    var label = new _paper.default.PointText({
      point: textPoint,
      justification: "center",
      fillColor: "white",
      font: "Roboto",
      fontSize: 20
    });
    var letter = String.fromCharCode(65 + index);
    label.content = letter;
    var circleGroup = new _paper.default.Group([circle, label]);
    if (tree !== null) {
      return {
        circle: circle,
        label: letter,
        previousLabel: previousLabel,
        properties: properties,
        type: "node",
        circleGroup: circleGroup,
        tree: _reactAwesomeQueryBuilder.Utils.loadTree(tree)
      };
    } else {
      return {
        circle: circle,
        label: letter,
        previousLabel: previousLabel,
        properties: properties,
        type: "node",
        circleGroup: circleGroup
      };
    }
  };
  var addCircle = function addCircle(point, node) {
    // add circle to paper
    var circle = new _paper.default.Path.Circle(point, circleRadius);
    circle.strokeColor = "#000000";
    circle.strokeWidth = 3;
    circle.fillColor = context.neuronColors[node.index];
    circle.opacity = 1.0;
    circle.position = point;
    placeCircle(circle, node.label, node.properties, "tree" in node ? node.tree : null);
  };
  var placeCircle = function placeCircle(circle, letter) {
    var _currentPath;
    var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var tree = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    circle.opacity = 1;
    var textPoint = [circle.position.x, circle.position.y + 7];
    var label = new _paper.default.PointText({
      point: textPoint,
      justification: "center",
      fillColor: "white",
      font: "Roboto",
      fontSize: 20
    });
    label.content = letter;
    (_currentPath = currentPath) === null || _currentPath === void 0 ? void 0 : _currentPath.remove();
    currentPath = null;
    var circleGroup = new _paper.default.Group([circle, label]);
    if (tree !== null) {
      setNodes(function (nodes) {
        return [].concat(_toConsumableArray(nodes), [{
          circle: circle,
          label: letter,
          properties: properties,
          type: "node",
          circleGroup: circleGroup,
          tree: _reactAwesomeQueryBuilder.Utils.loadTree(tree)
        }]);
      });
    } else {
      setNodes(function (nodes) {
        return [].concat(_toConsumableArray(nodes), [{
          circle: circle,
          label: letter,
          properties: properties,
          type: "node",
          circleGroup: circleGroup
        }]);
      });
    }
  };
  var bindPencilEvents = function bindPencilEvents() {
    currentPath = null;
    pencil.onMouseMove = function (event) {
      var point = new _paper.default.Point(event.point);
      testCircle.position = point;
      if (mouseState === "node") {
        if (context.selectedSketchElement) context.setSelectedSketchElement(null);
        var numNodes = (nodes === null || nodes === void 0 ? void 0 : nodes.length) || 0;
        var color = numNodes <= context.neuronColors.length ? context.neuronColors[numNodes] : "#000000";
        // Create new Circle
        if (!currentPath) {
          currentPath = new _paper.default.Path.Circle(point, circleRadius);
          currentPath.strokeColor = "#000000";
          currentPath.strokeWidth = 3;
          currentPath.fillColor = color;
          currentPath.opacity = 0.5;
        } else {
          // Move existing circle
          currentPath.position = point;
        }
      } else if (mouseState === "edge") {
        if (context.selectedSketchElement) context.setSelectedSketchElement(null);
        if (!currentPath) {
          currentPath = new _paper.default.Path();
          currentPath.strokeColor = "#000000";
          currentPath.strokeWidth = 3;
          currentPath.opacity = 0.5;
          currentPath.add([point.x - 10, point.y]);
          currentPath.add([point.x + 10, point.y]);
        }
        var intersections = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        // Starting Point of Edge
        if (intersections === -1 && currentNode) {
          currentPath.segments[0].point = currentNode.circle.getNearestPoint(point);
          currentPath.segments[1].point = point;
        } //    Ending Point of Edge
        else if (intersections !== -1 && currentNode && !_lodash.default.isEqual(currentNode, nodes[intersections])) {
          currentPath.segments[0].point = currentNode.circle.getNearestPoint(nodes[intersections].circle.position);
          currentPath.segments[1].point = nodes[intersections].circle.getNearestPoint(currentNode.circle.position);
        } // Otherwise move the line glyph
        else {
          currentPath.segments[0].point = new _paper.default.Point([point.x - 10, point.y]);
          currentPath.segments[1].point = new _paper.default.Point([point.x + 10, point.y]);
        }
      } else if (mouseState === "edit") {
        // Check with intersections with nodes
        var _intersections = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        // Check with intersections with nodes
        if (_intersections !== -1) {
          currentSelection = nodes[_intersections];
          return;
        }
        // Check with intersections with edges
        _intersections = _lodash.default.findLastIndex(edges.map(function (e) {
          return !_lodash.default.isEmpty(testCircle === null || testCircle === void 0 ? void 0 : testCircle.getIntersections(e.edgeLine));
        }), function (e) {
          return e === true;
        });
        if (_intersections !== -1) {
          currentSelection = edges[_intersections];
          return;
        }
        currentSelection = null;
      } else if (mouseState === "move") {
        var _intersections2 = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        // Check with intersections with nodes
        if (_intersections2 !== -1) {
          currentSelection = nodes[_intersections2];
          nodes[_intersections2].circle.selected = true;
        } else {
          currentSelection = null;
          _paper.default.project.activeLayer.selected = false;
        }
      }
    };
    pencil.onMouseDown = function (event) {
      var point = new _paper.default.Point(event.point);
      if (mouseState === "node") {
        if (!currentPath) return;
        // Create new node
        var numNodes = (nodes === null || nodes === void 0 ? void 0 : nodes.length) || 0;
        var letter = String.fromCharCode(65 + numNodes);
        var circle = currentPath.clone();
        placeCircle(circle, letter);
      } else if (mouseState === "edge") {
        var _currentPath2;
        var intersections = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        if (intersections !== -1 && !currentNode && currentPath) {
          currentNode = nodes[intersections];
          currentPath.segments[0].position = currentNode.circle.getNearestPoint(point);
          return;
        } else if (currentPath && intersections !== -1) {
          if (!_lodash.default.isEqual(currentNode, nodes[intersections])) {
            // If line intersects with two nodes, draw edge
            currentPath.segments[0].point = currentNode.circle.getNearestPoint(nodes[intersections].circle.position);
            currentPath.segments[1].point = nodes[intersections].circle.getNearestPoint(currentNode.circle.position);
            var edge = currentPath.clone();
            edge.opacity = 1;
            addEdge(currentNode, nodes[intersections], edge);
          }
        }
        (_currentPath2 = currentPath) === null || _currentPath2 === void 0 ? void 0 : _currentPath2.remove();
        currentNode = null;
        currentPath = null;
      } else if (mouseState == "edit") {
        var nodeIntersections = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        var edgeIntersections = _lodash.default.findLastIndex(edges.map(function (e) {
          return !_lodash.default.isEmpty(testCircle === null || testCircle === void 0 ? void 0 : testCircle.getIntersections(e.edgeLine));
        }), function (e) {
          return e === true;
        });
        // select the clicked on element and show the popper
        if (nodeIntersections !== -1 || edgeIntersections !== -1) {
          var _currentSelection, _currentSelection2;
          context.setSelectedSketchElement(currentSelection);
          var selectedElement = ((_currentSelection = currentSelection) === null || _currentSelection === void 0 ? void 0 : _currentSelection.lineGroup) || ((_currentSelection2 = currentSelection) === null || _currentSelection2 === void 0 ? void 0 : _currentSelection2.circle);
          _paper.default.project.activeLayer.selected = false;
          selectedElement.selected = true;
          setShowPopper(true);
        } else {
          // If they click out, make the popper go away
          setShowPopper(false);
          context.setSelectedSketchElement(null);
          setPopperLocation(null);
        }
      } else if (mouseState === "move") {
        var _intersections3 = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        // Check with intersections with nodes
        if (_intersections3 !== -1) {
          currentSelection = nodes[_intersections3];
        }
        if (currentSelection) {
          setCursor("grabbing");
        }
      }
    };
    pencil.onMouseUp = function (event) {
      if (mouseState === "move") {
        console.log("grab", currentNode);
        var nodeIndex = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.label === currentNode.label;
        }));
        // // list of edges including this edge
        var tmpEdges = _lodash.default.clone(edges);
        var edgesToAddAgain = [];
        var filteredEdges = tmpEdges.filter(function (e) {
          if (e.indices.includes(nodeIndex)) {
            edgesToAddAgain.push(e);
            return false;
          }
          return true;
        });
        var newEdges = edgesToAddAgain.map(function (e) {
          e.edgeLine.opacity = 1;
          return createEdge(e.fromNode, e.toNode, e.edgeLine, e.indices, e.properties, e.tree, e.propertyLabel);
        });
        console.log(newEdges);
        setEdges([].concat(_toConsumableArray(newEdges), _toConsumableArray(filteredEdges)));
        setCursor("grab");
      }
    };
    pencil.onMouseDrag = function (event) {
      if (mouseState === "move") {
        nodeLabels.forEach(function (label) {
          label === null || label === void 0 ? void 0 : label.remove();
        });
        var intersections = _lodash.default.findLastIndex(nodes.map(function (n) {
          return n.circle.contains(event.point);
        }), function (e) {
          return e === true;
        });
        // Check with intersections with nodes
        if (intersections === -1) return;
        nodes[intersections].circleGroup.position = new _paper.default.Point(event.point);
        currentNode = nodes[intersections];
        edges.forEach(function (e, i) {
          if (e.indices.includes(intersections)) {
            if (e.lineGroup) {
              var _edges$i$propertyLabe;
              edges[i].edgeLine.remove();
              edges[i].lineGroup.remove();
              (_edges$i$propertyLabe = edges[i].propertyLabel) === null || _edges$i$propertyLabe === void 0 ? void 0 : _edges$i$propertyLabe.remove();
              edges[i].edgeLine = null;
              edges[i].edgeLine = null;
              edges[i].oppositeEdge = null;
              edges[i].edgeLine = new _paper.default.Path();
              edges[i].edgeLine.strokeColor = "#000000";
              edges[i].edgeLine.strokeWidth = 3;
              edges[i].edgeLine.opacity = 0.5;
              edges[i].edgeLine.add([0, 0]);
              edges[i].edgeLine.add([0, 0]);
            }
            edges[i].edgeLine.segments[0].point = nodes[e.indices[0]].circle.getNearestPoint(nodes[e.indices[1]].circle.position);
            edges[i].edgeLine.segments[1].point = nodes[e.indices[1]].circle.getNearestPoint(nodes[e.indices[0]].circle.position);
          }
        });
      }
    };
  };
  var addEdge = function addEdge(fromNode, toNode, edgeLine) {
    var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var tree = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var addEdgeImmediately = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var nodeIndices = [_lodash.default.findLastIndex(nodes, fromNode), _lodash.default.findLastIndex(nodes, toNode)];
    var matchingEdge = _lodash.default.findIndex(edges, function (e) {
      return _lodash.default.isEqual(e.indices, nodeIndices);
    });
    if (matchingEdge !== -1) {
      console.log("Edge Exists");
      edgeLine.remove();
      return;
    }
    var newEdgeObj = createEdge(fromNode, toNode, edgeLine, nodeIndices, properties, tree);
    addEdgePropertyLabel(newEdgeObj);
    if (addEdgeImmediately) {
      setEdges([].concat(_toConsumableArray(edges), [newEdgeObj]));
    }
    return newEdgeObj;
  };
  var createEdge = function createEdge(fromNode, toNode, edgeLine, nodeIndices) {
    var properties = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var tree = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var propertyLabel = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var edgeObj = {
      indices: nodeIndices,
      toNode: toNode,
      fromNode: fromNode,
      edgeLine: edgeLine
    };
    // If this edge already exists, don't create it
    // Checks from an edge going the opposite direction between the same two nodes
    var origToPoint = _lodash.default.cloneDeep(edgeLine.segments[0].point);
    var circ = new _paper.default.Path.Circle(origToPoint, 8);
    var toPoint = edgeLine.segments[0].point = circ.getIntersections(edgeLine)[0].point;
    circ.remove();
    var origFromPoint = _lodash.default.cloneDeep(edgeLine.segments[1].point);
    circ = new _paper.default.Path.Circle(origFromPoint, 8);
    var fromPoint = edgeLine.segments[1].point = circ.getIntersections(edgeLine)[0].point;
    var dy = toPoint.y - fromPoint.y;
    var dx = toPoint.x - fromPoint.x;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    var newY = 7 * Math.sin(theta) + fromPoint.y;
    var newX = 7 * Math.cos(theta) + fromPoint.x;
    var circle = new _paper.default.Path.Circle([newX, newY], 7);
    // Check where the arrow head points should be
    var secondCircle = new _paper.default.Path.Circle(circle.getNearestPoint(toPoint), 7);
    var intersections = secondCircle.getIntersections(circle).map(function (intersection) {
      return intersection.point;
    });
    intersections.splice(1, 0, fromPoint);
    var trianglePath = new _paper.default.Path(intersections);
    trianglePath.strokeColor = "black";
    trianglePath.strokeWidth = 3;
    trianglePath.strokeJoin = "round";
    // Create a big group with line and arrow
    edgeObj["toPoint"] = toPoint;
    edgeObj["fromPoint"] = fromPoint;
    edgeObj["lineGroup"] = new _paper.default.Group([trianglePath, edgeObj.edgeLine]);
    secondCircle === null || secondCircle === void 0 ? void 0 : secondCircle.remove();
    circle === null || circle === void 0 ? void 0 : circle.remove();
    edgeObj["type"] = "edge";
    edgeObj["label"] = "".concat(edgeObj.fromNode.label, " -> ").concat(edgeObj.toNode.label);
    edgeObj["properties"] = properties;
    if (tree !== null) {
      edgeObj["tree"] = _reactAwesomeQueryBuilder.Utils.loadTree(tree);
    } else {
      edgeObj["tree"] = tree;
    }
    if (propertyLabel) edgeObj = addEdgePropertyLabel(edgeObj);
    return edgeObj;
  };
  var addEdgePropertyLabel = function addEdgePropertyLabel(e) {
    var _e$propertyLabel;
    // Remove any existing label
    if (!e.properties) return e;
    (_e$propertyLabel = e.propertyLabel) === null || _e$propertyLabel === void 0 ? void 0 : _e$propertyLabel.remove();
    var midpoint = new _paper.default.Point([(e.toPoint.x + e.fromPoint.x) / 2, (e.toPoint.y + e.fromPoint.y) / 2]);
    var midpointCircle = new _paper.default.Path.Circle(midpoint, 10);
    var intersectionsCircles = midpointCircle.getIntersections(e.lineGroup.children[1]).map(function (i) {
      return new _paper.default.Path.Circle(i.point, 15);
    });
    var drawPoints = intersectionsCircles[0].getIntersections(intersectionsCircles[1]).map(function (i) {
      return i.point;
    });
    var topPoint = _lodash.default.sortBy(drawPoints, "y")[0];
    midpointCircle.remove();
    intersectionsCircles.map(function (i) {
      return i.remove();
    });
    var labelText = "";
    if ("weight" in e.properties) {
      if (_lodash.default.isNumber(e.properties.weight)) {
        labelText = e.properties.weight;
      } else if (e.properties.weight["$lt"]) {
        labelText = "< " + e.properties.weight["$lt"];
      } else if (e.properties.weight["$gt"]) {
        labelText = "> " + e.properties.weight["$gt"];
      }
    }
    var propertyLabel = new _paper.default.PointText({
      point: topPoint,
      justification: "center",
      fillColor: "black",
      font: "Roboto",
      fontSize: 14
    });
    propertyLabel.content = labelText;
    e.propertyLabel = propertyLabel;
    return e;
  };
  var getNodeLocations = function getNodeLocations() {
    return nodes.map(function (n) {
      return {
        label: n.label,
        position: n.circle.position
      };
    });
  };
  (0, _react.useEffect)(function () {
    if (importData && nodeImportUpdate) {
      importData.nodes.forEach(function (node) {
        var point = new _paper.default.Point(node.position[1], node.position[2]);
        addCircle(point, node);
      });
      setNodeImportUpdate(false);
      setEdgeImportUpdate(true);
    }
  }, [nodeImportUpdate]);
  (0, _react.useEffect)(function () {
    if (importData && edgeImportUpdate) {
      var newEdges = [];
      try {
        importData.edges.forEach(function (edge) {
          var myInputStartNode = importData.nodes.find(function (node) {
            return node.index === edge.indices[0];
          });
          var myInputEndNode = importData.nodes.find(function (node) {
            return node.index === edge.indices[1];
          });
          var path = new _paper.default.Path();
          path.strokeColor = "#000000";
          path.strokeWidth = 3;
          path.opacity = 1.0;
          path.add([myInputStartNode.position[1], myInputStartNode.position[2]]);
          path.add([myInputEndNode.position[1], myInputEndNode.position[2]]);
          var startNode = nodes[edge.indices[0]];
          var endNode = nodes[edge.indices[1]];
          path.segments[0].point = startNode.circle.getNearestPoint(endNode.circle.position);
          path.segments[1].point = endNode.circle.getNearestPoint(startNode.circle.position);
          var tree = "tree" in edge ? edge.tree : null;
          var newEdge = addEdge(startNode, endNode, path, edge.properties, tree, false);
          newEdges.push(newEdge);
        });
        context.setErrorMessage(null);
        context.setLoadingMessage(null);
      } catch (TypeError) {
        context.setErrorMessage("The motif can't import. Please try again in a larger window.");
        context.setLoadingMessage(null);
        clearSketch();
      }

      // add new edges to edges
      setEdges([].concat(_toConsumableArray(edges), newEdges));
      setEdgeImportUpdate(false);
      setImportData(null);
    }
  }, [edgeImportUpdate]);

  // Checks for edges going opposite to each other and offsets them so they are distinguishable
  (0, _react.useEffect)(function () {
    if (!edges) return;
    edges.forEach(function (e, i) {
      var oppositeEdge = _lodash.default.findIndex(edges, function (oppE) {
        return _lodash.default.isEqual(oppE.indices, [e.indices[1], e.indices[0]]);
      });
      if (oppositeEdge !== -1 && !e.oppositeEdge && oppositeEdge > i) {
        var midpoint = new _paper.default.Point([(e.toPoint.x + e.fromPoint.x) / 2, (e.toPoint.y + e.fromPoint.y) / 2]);
        var circle1 = new _paper.default.Path.Circle(midpoint, 5);
        var circle2 = new _paper.default.Path.Circle(circle1.getIntersections(edges[oppositeEdge].edgeLine)[0].point, Math.sqrt(Math.pow(5, 2) + Math.pow(5, 2)));
        var pointDelta = circle2.getIntersections(circle1).map(function (e) {
          return e.point;
        }).sort(function (a, b) {
          return a.y - b.y;
        }).map(function (pt) {
          return new _paper.default.Point([midpoint.x - pt.x, midpoint.y - pt.y]);
        });
        e["lineGroup"].translate(pointDelta[0]);
        edges[oppositeEdge]["lineGroup"].translate(pointDelta[1]);
        edges[oppositeEdge]["oppositeEdge"] = i;
        e["oppositeEdge"] = oppositeEdge;
      }
      if (e.properties === undefined && e.propertyLabel) {
        e.propertyLabel.content = "";
      }
    });
  }, [edges]);
  (0, _react.useEffect)(function () {
    if (pencil && mouseState) {
      // Rebind the pencil events whenever new nodes are drawn
      bindPencilEvents();
    }
  }, [pencil, mouseState, nodes, edges]);
  (0, _react.useEffect)(function () {
    var _currentPath3, _paper$project2;
    (_currentPath3 = currentPath) === null || _currentPath3 === void 0 ? void 0 : _currentPath3.remove();
    setPopperLocation(null);
    setShowPopper(false);
    if (_paper.default !== null && _paper.default !== void 0 && (_paper$project2 = _paper.default.project) !== null && _paper$project2 !== void 0 && _paper$project2.activeLayer) {
      _paper.default.project.activeLayer.selected = false;
      // Remove all undrawn shapes when you switch modes
      _paper.default.project.activeLayer.children.forEach(function (child) {
        if (child.opacity === 0.5) child.remove();
      });
    }
  }, [mouseState]);
  (0, _react.useEffect)(function () {
    // if context.selectedSketchElement is not null
    if (context.selectedSketchElement) {
      var _context$selectedSket2, _context$selectedSket3;
      var paperElement = ((_context$selectedSket2 = context.selectedSketchElement) === null || _context$selectedSket2 === void 0 ? void 0 : _context$selectedSket2.circle) || (context === null || context === void 0 ? void 0 : (_context$selectedSket3 = context.selectedSketchElement) === null || _context$selectedSket3 === void 0 ? void 0 : _context$selectedSket3.edgeLine);
      // Calculate where on screen coordinates the popper should go
      var position = paperElement.getPosition();
      var boundingRect = _paper.default.view.element.getBoundingClientRect();
      if (paperElement && position) {
        setPopperLocation({
          top: position.y + boundingRect.top + 30,
          left: position.x + boundingRect.left - 30
        });
      }
      if (context.selectedSketchElement.type === "edge") {
        setEdges(edges.map(function (e) {
          // Update the edge with the query properties
          if (_lodash.default.isEqual(e.edgeLine, context.selectedSketchElement.edgeLine)) {
            e.tree = context.selectedSketchElement.tree;
            e.properties = context.selectedSketchElement.properties;
            e = addEdgePropertyLabel(e);
          }
          if (e.fromNode.label === context.selectedSketchElement.fromNode.label && e.toNode.label === context.selectedSketchElement.toNode.label) {
            e.edgeLine.strokeColor = "red";
            e.lineGroup.children[0].strokeColor = "red";
          } else {
            e.edgeLine.strokeColor = "#000000";
            e.lineGroup.children[0].strokeColor = "#000000";
          }
          return e;
        }));
      } else {
        setNodes(nodes.map(function (n) {
          if (_lodash.default.isEqual(n.circle, context.selectedSketchElement.circle)) {
            // Update the node with the query properties
            n.tree = context.selectedSketchElement.tree;
            n.properties = context.selectedSketchElement.properties;
          }
          return n;
        }));
      }
    } else {
      setPopperLocation(null);
      setEdges(edges.map(function (e) {
        e.edgeLine.strokeColor = "#000000";
        e.lineGroup.children[0].strokeColor = "#000000";
        return e;
      }));
    }
  }, [context.selectedSketchElement]);

  // On init set up our paperjs
  (0, _react.useEffect)(function () {
    _paper.default.setup(sketchPanelId);
    _paper.default.view.onResize = function () {
      setCanvasDimension(_paper.default.view.size);
    };
    setCanvasDimension(_paper.default.view.size);
    var tempCircle = new _paper.default.Path.Circle([0, 0], 6);
    tempCircle.fill = "none";
    tempCircle.strokeWidth = 0;
    setTestCircle(tempCircle);
    setPencil(new _paper.default.Tool());
  }, []);
  var getEncodedMotif = function getEncodedMotif(nodes, edges) {
    var encodedNodes = nodes.map(function (n, i) {
      return {
        label: n.label,
        properties: n.properties,
        index: i,
        position: n.circle.position,
        tree: n.tree
      };
    });
    var encodedEdges = edges.map(function (e, i) {
      return {
        label: e.label,
        properties: e.properties,
        index: i,
        indices: e.indices,
        tree: e.tree
      };
    });
    var sketchPanelDim = {
      width: canvasDimension.width,
      height: canvasDimension.height
    };
    return {
      nodes: encodedNodes,
      edges: encodedEdges,
      dimension: sketchPanelDim
    };
  };
  // Encode the Nodes and Edges For Query
  (0, _react.useEffect)( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var encodedMotif, count, relative_count;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          encodedMotif = getEncodedMotif(nodes, edges); // most motif queries fail for n larger than 4, develop heuristics to make more accurate
          nodes.length > 4 ? context.setShowWarning(true) : context.setShowWarning(false);
          _context3.next = 4;
          return getMotifCount(JSON.stringify(encodedMotif));
        case 4:
          count = _context3.sent;
          context.setAbsMotifCount(count);

          // get relative count of motif in network
          _context3.next = 8;
          return getRelativeMotifCount(JSON.stringify(encodedMotif));
        case 8:
          relative_count = _context3.sent;
          context.setRelativeMotifCount(relative_count);
          context.setMotifQuery(encodedMotif);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })), [nodes, edges]);
  var isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };
  var parsePropertyText = function parsePropertyText(key, value) {
    var parsedValue = "";
    if (isObject(value)) {
      if (value["$ne"]) {
        parsedValue = "Not ".concat(value["$ne"]);
      } else if (value["$lt"]) {
        parsedValue = "< " + value["$lt"];
      } else if (value["$gt"]) {
        parsedValue = "> " + value["$gt"];
      }
    } else {
      parsedValue = value;
    }
    return "".concat(key, ": ").concat(parsedValue, "\n");
  };
  (0, _react.useEffect)(function () {
    if (!nodes) return;
    nodeLabels.forEach(function (label) {
      label === null || label === void 0 ? void 0 : label.remove();
    });
    setNodeLabels(nodes.map(function (n) {
      if (!showInfo) return null;
      console.log("nodes", n, "show", showInfo);
      var propertiesText = _lodash.default.entries(n === null || n === void 0 ? void 0 : n.properties).map(function (p) {
        return parsePropertyText(p[0], p[1]);
      });
      var labelPoint = [n.circle.position.x, n.circle.position.y - circleRadius - 10 * propertiesText.length];
      var label = new _paper.default.PointText({
        point: labelPoint,
        justification: "center",
        fillColor: "black",
        font: "Roboto",
        fontSize: 10
      });
      label.content = propertiesText.join("");
      return label;
    }));
  }, [nodes, showInfo, edges]);
  (0, _react.useEffect)(function () {
    if (context.constraintsToAddToSketch) {
      var newNodes = nodes.map(function (node, i) {
        var nodeTree = "tree" in node ? node.tree : null;
        if (node.label === context.constraintsToAddToSketch.nodeKey) {
          var newProperties = node.properties ? node.properties : {};
          newProperties.bodyId = context.constraintsToAddToSketch.bodyId;
          if (!nodeTree) {
            nodeTree = _reactAwesomeQueryBuilder.Utils.checkTree(_reactAwesomeQueryBuilder.Utils.loadTree({
              id: _reactAwesomeQueryBuilder.Utils.uuid(),
              type: "group"
            }), _objectSpread(_objectSpread({}, InitialConfig), {}, {
              fields: _NodeFields.NodeFields
            }));
          }
          var treeJsValue = _reactAwesomeQueryBuilder.Utils.getTree(nodeTree);
          var newChild = treeJsValue.children1 ? treeJsValue.children1 : [];
          newChild.push({
            // id: node.tree.get("id"),
            id: _reactAwesomeQueryBuilder.Utils.uuid(),
            properties: {
              field: "bodyId",
              operator: "equal",
              value: [context.constraintsToAddToSketch.bodyId],
              valueSrc: ["value"],
              operatorOptions: null,
              valueType: ["number"]
            },
            type: "rule"
          });
          var newTreeJsValue = _objectSpread(_objectSpread({}, treeJsValue), {}, {
            children1: newChild
          });
          var newNodeTree = _reactAwesomeQueryBuilder.Utils.checkTree(_reactAwesomeQueryBuilder.Utils.loadTree(newTreeJsValue), _objectSpread(_objectSpread({}, InitialConfig), {}, {
            fields: _NodeFields.NodeFields
          }));
          return renameCircle(node.circle, i, newProperties, newNodeTree, node.label);
        } else {
          return renameCircle(node.circle, i, node.properties, nodeTree, node.label);
        }
      });
      setNodes(newNodes);
    }
  }, [context.constraintsToAddToSketch]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "sketch-panel-style"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    className: "canvas-wrapper",
    spacing: 0
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 1.4
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "column",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Draw Node",
    placement: "right"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "node",
    color: mouseState === "node" ? "primary" : "default",
    onClick: function onClick() {
      var _currentPath4;
      (_currentPath4 = currentPath) === null || _currentPath4 === void 0 ? void 0 : _currentPath4.remove();
      setCursor("crosshair");
      setMouseState("node");
    }
  }, /*#__PURE__*/_react.default.createElement(_CircleTwoTone.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Draw Edge",
    placement: "right"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    color: mouseState === "edge" ? "primary" : "default",
    onClick: function onClick() {
      var _currentPath5;
      (_currentPath5 = currentPath) === null || _currentPath5 === void 0 ? void 0 : _currentPath5.remove();
      setCursor("crosshair");
      setMouseState("edge");
    }
  }, /*#__PURE__*/_react.default.createElement(_ArrowRightAlt.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Edit Properties",
    placement: "right"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "edit",
    color: mouseState === "edit" ? "primary" : "default",
    onClick: function onClick() {
      var _currentPath6;
      setCursor("pointer");
      (_currentPath6 = currentPath) === null || _currentPath6 === void 0 ? void 0 : _currentPath6.remove();
      setMouseState("edit");
    }
  }, /*#__PURE__*/_react.default.createElement(_Edit.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Move",
    placement: "right"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "edit",
    color: mouseState === "move" ? "primary" : "default",
    onClick: function onClick() {
      var _currentPath7;
      setCursor("grab");
      (_currentPath7 = currentPath) === null || _currentPath7 === void 0 ? void 0 : _currentPath7.remove();
      setMouseState("move");
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "sm",
    icon: _freeSolidSvgIcons.faHand
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Node Info",
    placement: "right"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "node",
    color: showInfo ? "primary" : "default",
    onClick: function onClick() {
      setShowInfo(!showInfo);
    }
  }, /*#__PURE__*/_react.default.createElement(_Info.default, {
    fontSize: "small"
  }))))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 9.2,
    style: {
      height: "inherit"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "sketch-canvas",
    id: "sketch-canvas-container",
    style: {
      cursor: cursor || "crosshair"
    }
  }, /*#__PURE__*/_react.default.createElement("canvas", {
    id: sketchPanelId,
    resize: "true"
  }), showPopper && popperLocation && context.selectedSketchElement && /*#__PURE__*/_react.default.createElement(_material.Popover, {
    anchorReference: "anchorPosition",
    open: true,
    hideBackdrop: true,
    className: "sketch-popover",
    disableEnforceFocus: true,
    anchorPosition: popperLocation,
    anchorOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    className: "popover-grid",
    direction: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    style: {
      position: "absolute",
      height: "40.75px"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      paddingLeft: 10,
      fontWeight: "bold",
      color: "#454545"
    }
  }, _lodash.default.capitalize(context.selectedSketchElement.type), " ", context.selectedSketchElement.label)), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    className: "popover-grid",
    direction: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    style: {
      position: "absolute",
      height: "40.75px",
      right: "110px"
    },
    zIndex: 3
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    size: "small",
    startIcon: /*#__PURE__*/_react.default.createElement(_Delete.default, null),
    onClick: function onClick() {
      return deleteSketchElement();
    }
  }, "Delete")), /*#__PURE__*/_react.default.createElement(_QueryBuilder.default, null)))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    item: true,
    xs: 1.4
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "column",
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Clear Sketch",
    placement: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    color: "default",
    onClick: function onClick() {
      setCursor("crosshair");
      clearSketch();
    }
  }, /*#__PURE__*/_react.default.createElement(_Delete.default, {
    fontSize: "small"
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Import Motif",
    placement: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "edit",
    color: "default",
    onClick: function onClick() {
      return importMotif();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "sm",
    icon: _freeSolidSvgIcons.faFileImport
  }))), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: "Export Motif",
    placement: "left"
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    value: "edit",
    color: "default",
    onClick: function onClick() {
      return exportMotif();
    }
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    size: "sm",
    icon: _freeSolidSvgIcons.faFileExport
  })))))));
}
var _default = SketchPanel;
exports.default = _default;