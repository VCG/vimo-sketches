import Sketch from "./lib/Sketch";
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2kuamluaGFuQGdtYWlsLmNvbSIsImxldmVsIjoibm9hdXRoIiwiaW1hZ2UtdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwN1FUTFhzenM3UEFZNVdTbHRkX3lmOVZDQ3prNFFBby1zV1RTaVA9czk2LWM_c3o9NTA_c3o9NTAiLCJleHAiOjE4NTY5ODY3NDN9.BIiJdKzPQJcA431XUNpaxwpqLd4ziaEa6pfdI2pi02M";
  const data_server = "https://neuprint.janelia.org/";
  const data_version = "hemibrain:v1.2.1";
  const vimo_server = "http://localhost:4242"; //"https://vimo-server-bmcp5imp6q-uk.a.run.app";
  const isQuerying = false;
  const processRequest = (query) => {
    console.log(query);
    return query;
  };
  const attrs = {};
  return (
    <div>
      <Sketch
        isQuerying={isQuerying}
        processRequest={processRequest}
        attrs={attrs}
      />
    </div>
  );
}

export default App;
