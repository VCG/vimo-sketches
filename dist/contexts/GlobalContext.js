"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextWrapper = exports.AppContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var AppContext = /*#__PURE__*/_react.default.createContext(null);

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.
exports.AppContext = AppContext;
var ContextWrapper = function ContextWrapper(props) {
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    globalMotifIndex = _useState2[0],
    setGlobalMotifIndex = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedMotifs = _useState4[0],
    setSelectedMotifs = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    focusedMotif = _useState6[0],
    setFocusedMotif = _useState6[1];
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    motifQuery = _useState8[0],
    setMotifQuery = _useState8[1];
  var _useState9 = (0, _react.useState)(),
    _useState10 = _slicedToArray(_useState9, 2),
    abstractionLevel = _useState10[0],
    setAbstractionLevel = _useState10[1];
  var _useState11 = (0, _react.useState)([
    // "#7e2fd0",
    // "#81D02F",
    // "#34AFCB",
    // "#B3A94C",
    // "#4C56B3",
    // "#D9C226",
    // "#263DD9",
    // "#CB5034",
    "#9400D3", "#DAA520", "#97d0b5", "#76acf3", "#FF6347", "#4C56B3", "#D9C226", "#263DD9"]),
    _useState12 = _slicedToArray(_useState11, 2),
    neuronColors = _useState12[0],
    setNeuronColors = _useState12[1];
  var _useState13 = (0, _react.useState)(["#FF6347", "#DAA520", "#97d0b5", "#76acf3", "#9400D3", "#4C56B3", "#D9C226", "#263DD9"]),
    _useState14 = _slicedToArray(_useState13, 2),
    synapseColors = _useState14[0],
    setSynapseColors = _useState14[1];
  var _useState15 = (0, _react.useState)("#0000ff"),
    _useState16 = _slicedToArray(_useState15, 2),
    highlightColor = _useState16[0],
    setHighlightColor = _useState16[1];
  var _useState17 = (0, _react.useState)(),
    _useState18 = _slicedToArray(_useState17, 2),
    loadingMessage = _useState18[0],
    setLoadingMessage = _useState18[1];
  var _useState19 = (0, _react.useState)(),
    _useState20 = _slicedToArray(_useState19, 2),
    errorMessage = _useState20[0],
    setErrorMessage = _useState20[1];
  var _useState21 = (0, _react.useState)(null),
    _useState22 = _slicedToArray(_useState21, 2),
    selectedSketchElement = _useState22[0],
    setSelectedSketchElement = _useState22[1];
  var _useState23 = (0, _react.useState)(0),
    _useState24 = _slicedToArray(_useState23, 2),
    resetUICounter = _useState24[0],
    setResetUICounter = _useState24[1];

  // motif occurences stats
  var _useState25 = (0, _react.useState)(null),
    _useState26 = _slicedToArray(_useState25, 2),
    absMotifCount = _useState26[0],
    setAbsMotifCount = _useState26[1]; // count of a motif in the dataset, e.g motif1 occurs 100 times in the dataset
  var _useState27 = (0, _react.useState)(null),
    _useState28 = _slicedToArray(_useState27, 2),
    relativeMotifCount = _useState28[0],
    setRelativeMotifCount = _useState28[1]; // count of all motifs in the dataset. e.g, motif1 is Highly represented in the dataset
  var _useState29 = (0, _react.useState)(false),
    _useState30 = _slicedToArray(_useState29, 2),
    showWarning = _useState30[0],
    setShowWarning = _useState30[1];

  // neighborhood query results
  var _useState31 = (0, _react.useState)(null),
    _useState32 = _slicedToArray(_useState31, 2),
    neighborhoodQuery = _useState32[0],
    setNeighborhoodQuery = _useState32[1];
  var _useState33 = (0, _react.useState)(null),
    _useState34 = _slicedToArray(_useState33, 2),
    motifToAdd = _useState34[0],
    setMotifToAdd = _useState34[1];
  var _useState35 = (0, _react.useState)(null),
    _useState36 = _slicedToArray(_useState35, 2),
    motifToDelete = _useState36[0],
    setMotifToDelete = _useState36[1];
  var _useState37 = (0, _react.useState)({}),
    _useState38 = _slicedToArray(_useState37, 2),
    currentNeuronLabels = _useState38[0],
    setCurrentNeuronLabels = _useState38[1];

  // search constraints
  var _useState39 = (0, _react.useState)(),
    _useState40 = _slicedToArray(_useState39, 2),
    constraintsToAddToSketch = _useState40[0],
    setConstraintsToAddToSketch = _useState40[1];
  var _useState41 = (0, _react.useState)([]),
    _useState42 = _slicedToArray(_useState41, 2),
    displayedROIs = _useState42[0],
    setDisplayedROIs = _useState42[1];
  return /*#__PURE__*/_react.default.createElement(AppContext.Provider, {
    value: {
      globalMotifIndex: globalMotifIndex,
      setGlobalMotifIndex: setGlobalMotifIndex,
      selectedMotifs: selectedMotifs,
      setSelectedMotifs: setSelectedMotifs,
      selectedSketchElement: selectedSketchElement,
      setSelectedSketchElement: setSelectedSketchElement,
      motifQuery: motifQuery,
      setMotifQuery: setMotifQuery,
      abstractionLevel: abstractionLevel,
      setAbstractionLevel: setAbstractionLevel,
      loadingMessage: loadingMessage,
      setLoadingMessage: setLoadingMessage,
      neuronColors: neuronColors,
      setNeuronColors: setNeuronColors,
      synapseColors: synapseColors,
      setSynapseColors: setSynapseColors,
      resetUICounter: resetUICounter,
      setResetUICounter: setResetUICounter,
      absMotifCount: absMotifCount,
      setAbsMotifCount: setAbsMotifCount,
      relativeMotifCount: relativeMotifCount,
      setRelativeMotifCount: setRelativeMotifCount,
      showWarning: showWarning,
      setShowWarning: setShowWarning,
      neighborhoodQuery: neighborhoodQuery,
      setNeighborhoodQuery: setNeighborhoodQuery,
      highlightColor: highlightColor,
      setHighlightColor: setHighlightColor,
      motifToAdd: motifToAdd,
      setMotifToAdd: setMotifToAdd,
      motifToDelete: motifToDelete,
      setMotifToDelete: setMotifToDelete,
      focusedMotif: focusedMotif,
      setFocusedMotif: setFocusedMotif,
      currentNeuronLabels: currentNeuronLabels,
      setCurrentNeuronLabels: setCurrentNeuronLabels,
      errorMessage: errorMessage,
      setErrorMessage: setErrorMessage,
      constraintsToAddToSketch: constraintsToAddToSketch,
      setConstraintsToAddToSketch: setConstraintsToAddToSketch,
      displayedROIs: displayedROIs,
      setDisplayedROIs: setDisplayedROIs
    }
  }, props.children);
};
exports.ContextWrapper = ContextWrapper;