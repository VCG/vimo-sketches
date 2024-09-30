import {create} from "zustand";
import { NEURON_COLORS } from "../config/Colors";

// Create the Zustand store
const useStore = create((set) => ({
  motifQuery: null,
  setMotifQuery: (query) => set({ motifQuery: query }),

  neuronColors: NEURON_COLORS,
  setNeuronColors: (colors) => set({ neuronColors: colors }),

  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),

  selectedSketchElement: null,
  setSelectedSketchElement: (element) => set({ selectedSketchElement: element }),

  absMotifCount: null,
  setAbsMotifCount: (count) => set({ absMotifCount: count }),

  relativeMotifCount: null,
  setRelativeMotifCount: (count) => set({ relativeMotifCount: count }),

}));
export default useStore;