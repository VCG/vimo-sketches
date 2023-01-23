export class Edge {
  constructor(from_neuron_id, to_neuron_id) {
    this.from = from_neuron_id;
    this.to = to_neuron_id;
    this.abstraction = { start: [], end: [] };
  }

  //def compute_line_abstractions(self, start_skeleton, end_skeleton)
}

export function getNodeKeyFromId(id, context) {
  if (context.focusedMotif) {
    const result = context.focusedMotif.neurons.filter(
      (neuron) => String(neuron.id) === id
    );
    // console.log(result)
    return result[0].nodeKey;
  }
  return;
}

export function getIdFromNodeKey(nodeKey, context) {
  if (context.focusedMotif) {
    const result = context.focusedMotif.neurons.filter(
      (neuron) => neuron.nodeKey === nodeKey
    );
    return String(result[0].id);
  }
  return;
}
