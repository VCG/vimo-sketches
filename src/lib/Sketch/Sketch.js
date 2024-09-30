import React from "react";
import MotifPanel from "./components/MotifPanel";
import useStore from "./contexts/GlobalContext";

function Sketch(props) {

  const { setNeuronColors } = useStore();
  if (props.nodeColors) setNeuronColors(props.nodeColors);


  // Wrap things in context that can use global context

  return (
    <MotifPanel {...props} />
  );
}

export default Sketch;
