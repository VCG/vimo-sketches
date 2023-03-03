import React, { useEffect, useState } from "react";
import { Sketch, NeuprintExecutor } from "@vimo-public/vimo-sketches";

function SearchingMotifsInNeuprintExample() {
  const token = "ADD YOUR TOKEN HERE"; // copy token from here https://neuprint.janelia.org/account
  const data_server = "https://neuprint.janelia.org/";
  const data_version = "hemibrain:v1.2.1";
  const vimo_server = "http://127.0.0.1:4242"; // setup instructions https://github.com/VCG/vimo-server
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

  const [isQuerying, setIsQuerying] = useState(false);

  const [attributes, setAttributes] = useState({
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
}

export default SearchingMotifsInNeuprintExample;
