import { Sketch } from "@vimo-public/vimo-sketches";

function BasicExample() {
  const processRequest = async (motifJson, lim) => {
    console.log("This function is called upon clicking the search button.");
  };
  return (
    <div>
      <Sketch processRequest={processRequest} />
    </div>
  );
}
export default BasicExample;
