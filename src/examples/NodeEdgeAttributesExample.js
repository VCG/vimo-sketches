import { Sketch } from "@vimo-public/vimo-sketches";

function NodeEdgeAttributesExample() {
  const attributes = {
    NodeFields: {
      node_attr_1: {
        label: "attr1_name",
        type: "text",
      },
      node_attr_2: {
        label: "attr2_name",
        type: "select",
        fieldSettings: {
          showSearch: true,
          listValues: ["alpha", "betha", "theta"],
        },
        valueSources: ["value"],
        operators: ["select_equals", "select_not_equals"],
      },
    },
    EdgeFields: {
      edge_attr_1: {
        label: "attr1_name",
        type: "number",
        fieldSettings: {
          min: 0,
        },
        valueSources: ["value"],
        preferWidgets: ["number"],
      },
      edge_attr_2: {
        label: "attr2_name",
        type: "number",
        operators: ["greater", "less", "equal"],
        valueSources: ["value"],
      },
    },
  };
  const processRequest = async (motifJson, lim) => {
    // this function is called when the user clicks the "Search" button
    console.log(motifJson);
    console.log(lim);
  };
  return (
    <div>
      <Sketch processRequest={processRequest} attributes={attributes} />
    </div>
  );
}

export default NodeEdgeAttributesExample;
