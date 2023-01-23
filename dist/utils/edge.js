"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edge = void 0;
exports.getIdFromNodeKey = getIdFromNodeKey;
exports.getNodeKeyFromId = getNodeKeyFromId;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Edge = /*#__PURE__*/_createClass(function Edge(from_neuron_id, to_neuron_id) {
  _classCallCheck(this, Edge);
  this.from = from_neuron_id;
  this.to = to_neuron_id;
  this.abstraction = {
    start: [],
    end: []
  };
}

//def compute_line_abstractions(self, start_skeleton, end_skeleton)
);
exports.Edge = Edge;
function getNodeKeyFromId(id, context) {
  if (context.focusedMotif) {
    var result = context.focusedMotif.neurons.filter(function (neuron) {
      return String(neuron.id) === id;
    });
    // console.log(result)
    return result[0].nodeKey;
  }
  return;
}
function getIdFromNodeKey(nodeKey, context) {
  if (context.focusedMotif) {
    var result = context.focusedMotif.neurons.filter(function (neuron) {
      return neuron.nodeKey === nodeKey;
    });
    return String(result[0].id);
  }
  return;
}