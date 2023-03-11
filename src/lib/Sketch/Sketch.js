import React from "react";
import { ContextWrapper } from "./contexts/GlobalContext";
import MotifPanel from "./components/MotifPanel";

function Sketch(props) {
  // Wrap things in context that can use global context
  return (
    <ContextWrapper>
      <MotifPanel {...props} />
    </ContextWrapper>
  );
}

export default Sketch;
