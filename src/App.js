import React, { useEffect, useState } from "react";
import Sketch from "./lib/Sketch/Sketch";
import NeuprintExecutor from "./lib/Executors/NeuprintExecutor";
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token = "ADD YOUR TOKEN HERE";
  const data_server = "https://neuprint.janelia.org/";
  const data_version = "hemibrain:v1.2.1";
  const vimo_server = "http://localhost:4242"; //"https://vimo-server-bmcp5imp6q-uk.a.run.app";
  const ne = new NeuprintExecutor(
    data_server,
    data_version,
    token,
    vimo_server
  );

  const processRequest = async (motifJson, lim) => {
    const query = await ne.json2cypher(motifJson, lim);
    console.log(query);
    return query;
  };

  // Example for neuprint
  const [isQuerying, setIsQuerying] = useState(false);
  const [attributes, setAttributes] = useState({
    displayMotifCount: false,
    getMotifCount: ne.getMotifCount,
    getRelativeMotifCount: ne.getRelativeMotifCount,
    isQuerying: isQuerying,
  });
  useEffect(async () => {
    setAttributes({
      ...attributes,
      NodeFields: await ne.getNodeFields(),
      EdgeFields: await ne.getEdgeFields(),
    });
  }, []);

  return (
    <div>
      <Sketch processRequest={processRequest} attributes={attributes} />
    </div>
  );
  // return <BasicExample />;
}

export default App;
