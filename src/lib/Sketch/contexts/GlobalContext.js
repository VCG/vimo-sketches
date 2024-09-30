import React, { useState } from "react";

import { NEURON_COLORS } from "../config/Colors";

export const AppContext = React.createContext(null);

// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.

export const ContextWrapper = (props) => {
  const { attributes } = props;
  const [motifQuery, setMotifQuery] = useState();
  const [neuronColors, setNeuronColors] = useState(
    typeof attributes != "undefined" &&
      typeof attributes.nodeColors != "undefined"
      ? attributes.nodeColors
      : NEURON_COLORS
  );
  const [errorMessage, setErrorMessage] = useState();
  const [selectedSketchElement, setSelectedSketchElement] = useState(null);

  // motif occurences stats
  const [absMotifCount, setAbsMotifCount] = useState(null); // count of a motif in the dataset, e.g motif1 occurs 100 times in the dataset
  const [relativeMotifCount, setRelativeMotifCount] = useState(null); // count of all motifs in the dataset. e.g, motif1 is Highly represented in the dataset
  // const [showWarning, setShowWarning] = useState(false);

  return (
    <AppContext.Provider
      value={{
        selectedSketchElement,
        setSelectedSketchElement,
        motifQuery,
        setMotifQuery,
        neuronColors,
        setNeuronColors,
        absMotifCount,
        setAbsMotifCount,
        relativeMotifCount,
        setRelativeMotifCount,
        // showWarning,
        // setShowWarning,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
