import Banner from "./lib/components/Banner";
import PanelView from "./lib/views/PanelView";
import { ContextWrapper } from "./lib/contexts/GlobalContext";
import Sketch from './lib/Sketch'
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2kuamluaGFuQGdtYWlsLmNvbSIsImxldmVsIjoibm9hdXRoIiwiaW1hZ2UtdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN1FUTFhzenM3UEFZNVdTbHRkX3lmOVZDQ3prNFFBby1zV1RTaVA9czk2LWM_c3o9NTA_c3o9NTAiLCJleHAiOjE4NTQyMjQyOTh9.dLZggUE2tLSIcQwWxCvYxGxemt475gy8c2vJG5P84XQ'
  return (
    <Sketch token={token} />
  );
}

export default App;
