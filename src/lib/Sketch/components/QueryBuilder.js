import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/GlobalContext";
import { Builder, Query, Utils as QbUtils } from "react-awesome-query-builder";
import MuiConfig from "react-awesome-query-builder/lib/config/mui";
import "react-awesome-query-builder/lib/css/styles.css";
import "react-awesome-query-builder/lib/css/compact_styles.css";
import "./QueryBuilder.css";

let InitialConfig = MuiConfig;
delete InitialConfig["conjunctions"]["OR"];
InitialConfig["settings"]["showNot"] = false;
InitialConfig["settings"]["groupOperators"] = false;
InitialConfig["settings"]["canAddGroup"] = false;
InitialConfig["settings"]["canReorder"] = false;
InitialConfig["settings"]["renderSize"] = "small";
InitialConfig["settings"]["setOpOnChangeField"] = ["keep", "first"];

function QueryBuilder({ NodeFields, EdgeFields }) {
  let [tree, setTree] = useState();
  const context = useContext(AppContext);

  useEffect(() => {
    const queryValue = { id: QbUtils.uuid(), type: "group" };
    setTree(
      QbUtils.checkTree(QbUtils.loadTree(queryValue), {
        ...InitialConfig,
        fields: NodeFields,
      })
    );
  }, []);

  useEffect(() => {
    const queryValue = { id: QbUtils.uuid(), type: "group" };
    if (
      context.selectedSketchElement &&
      context.selectedSketchElement.type === "edge"
    ) {
      setTree(
        QbUtils.checkTree(QbUtils.loadTree(queryValue), {
          ...InitialConfig,
          fields: EdgeFields,
        })
      );
    } else {
      setTree(
        QbUtils.checkTree(QbUtils.loadTree(queryValue), {
          ...InitialConfig,
          fields: NodeFields,
        })
      );
    }
  }, [context.selectedSketchElement]);

  const renderBuilder = (props) => (
    <div
      className="query-builder-container"
      style={{ padding: 0, minWidth: 300 }}
    >
      <div className="query-builder qb-lite" style={{ margin: 0 }}>
        <Builder {...props} />
      </div>
    </div>
  );
  const onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    // this.setState({, config: config});
    let query = QbUtils.mongodbFormat(immutableTree, config);
    setTree(immutableTree);
    let updatedElem = {
      ...context.selectedSketchElement,
      tree: immutableTree,
      properties: query,
    };
    context.setSelectedSketchElement(updatedElem);
  };
  return (
    <div>
      {tree &&
        context?.selectedSketchElement?.type === "node" &&
        (Object.keys(NodeFields).length > 0 ? (
          <Query
            {...InitialConfig}
            fields={NodeFields}
            value={context.selectedSketchElement.tree || tree}
            onChange={onChange}
            renderBuilder={renderBuilder}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
              width: "290px",
            }}
          ></div>
        ))}

      {tree &&
        context?.selectedSketchElement?.type === "edge" &&
        (Object.keys(EdgeFields).length > 0 ? (
          <Query
            {...InitialConfig}
            fields={EdgeFields}
            value={context.selectedSketchElement.tree || tree}
            onChange={onChange}
            renderBuilder={renderBuilder}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "45px",
              width: "290px",
            }}
          ></div>
        ))}
    </div>
  );
}

export default QueryBuilder;
