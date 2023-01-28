import Sketch from './lib/Sketch'
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token = ''
  const data_server = 'https://neuprint.janelia.org/'
  const data_version = 'hemibrain:v1.2.1'
  const isQuerying = false;
  const processRequest = (query) => {
    console.log(query)
    return query
  }
  return (
    <div>
      <Sketch data_server={data_server} data_version={data_version} token={token} isQuerying={isQuerying} processRequest={processRequest}/>
    </div>
  );
}

export default App;
