import Sketch from './lib/Sketch'
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token = ''
  const data_server = 'https://neuprint.janelia.org/'
  const data_version = 'hemibrain:v1.2.1'
  return (
    <div>
      <Sketch data_server={data_server} data_version={data_version} token={token} />
    </div>
  );
}

export default App;
