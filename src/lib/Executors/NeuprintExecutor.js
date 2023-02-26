import axios from "axios";

export default class NeuprintExecutor {
  constructor(dataServer, dataset, token, vimoServer) {
    this.dataServer = dataServer;
    this.dataset = dataset;
    this.token = token;
    this.vimoServer = vimoServer;
  }

  async fetchData(endpoint, attrs = {}) {
    try {
      const res = await axios.post(`${this.vimoServer}/${endpoint}`, {
        server: this.dataServer,
        version: this.dataset,
        token: JSON.stringify(this.token),
        ...attrs,
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

  async getNodeFields() {
    return await this.fetchData("fetch_node_fields");
  }

  async getEdgeFields() {
    return await this.fetchData("fetch_edge_fields");
  }

  async json2cypher(motifJson, lim) {
    return await this.fetchData("cypher", {
      motif: motifJson,
      lim: lim,
    });
  }

  getMotifCount = async (motif) => {
    // get request to backend to get motif count
    let url = `${this.vimoServer}/count/motif=${motif}`;
    return (await axios.get(url)).data;
  };

  getRelativeMotifCount = async (motif) => {
    // get request to backend to get motif count
    let url = `${this.vimoServer}/rel_count/motif=${motif}`;
    return (await axios.get(url)).data;
  };
}
