import React from 'react';
import PanelView from "./views/PanelView";
import { ContextWrapper } from "./contexts/GlobalContext";

function Sketch(props) {
  // Wrap things in context that can use global context
  // Props: data_server, data_version, token, isQuerying, processReauest
  return (
    <ContextWrapper>
      <div>
        <PanelView {...props} />
      </div>
    </ContextWrapper>
  );
}

export default Sketch;

