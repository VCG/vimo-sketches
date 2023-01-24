import React from "react";
import MotifPanel from "../components/MotifPanel";

function PanelView(props) {
  const {data_server, data_version, token} = props;

  return (
    <MotifPanel data_server={data_server} data_version={data_version} token={token}/>
  );
}

export default PanelView;
