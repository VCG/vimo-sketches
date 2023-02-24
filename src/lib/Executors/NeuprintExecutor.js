import axios from "axios";

export default class NeuprintExecutor {
  constructor(dataServer, dataset, token, vimoServer) {
    this.dataServer = dataServer;
    this.dataset = dataset;
    this.token = token;
    this.vimoServer = vimoServer;
  }

  getNodeFields() {}

  getEdgeFields() {}

  async json2cypher(motifJson, lim) {
    try {
      const res = await axios.post(`${this.vimoServer}/cypher`, {
        server: this.dataServer,
        version: this.dataset,
        token: JSON.stringify(this.token),
        motif: motifJson,
        lim: lim,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `${error.response.status}: ${error.response.data?.detail?.error}`
        );
      }
      throw error;
    }
  }
}
