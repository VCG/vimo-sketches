import React from 'react';
import Banner from "./components/Banner";
import PanelView from "./views/PanelView";
import { ContextWrapper } from "./contexts/GlobalContext";

function Sketch(props) {
  // Wrap things in context that can use global context
  const {data_server, data_version, token} = props;
  return (
    <ContextWrapper>
      <div>
        <Banner></Banner>
        <PanelView data_server={data_server} data_version={data_version} token={token} />
      </div>
    </ContextWrapper>
    // <span>testtesttest</span>
  );
}

export default Sketch;

