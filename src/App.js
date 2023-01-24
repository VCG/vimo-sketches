import Sketch from './lib/Sketch'
import "./App.css";

function App() {
  // Wrap things in context that can use global context
  const token = ''
  return (
    <Sketch token={token} />
  );
}

export default App;
