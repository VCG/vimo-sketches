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

  json2cypher() {
    //   try {
    //   const res = await axios.post(`${this.vimoServer}/cypher`, {
    //     server: data_server,
    //     version: data_version,
    //     token: JSON.stringify(token),
    //     motif: motif,
    //     lim: lim,
    //   });
    //   return res.data;
    // } catch (error) {
    //   if (error.response) {
    //     throw new Error(
    //       `${error.response.status}: ${error.response.data?.detail?.error}`
    //     );
    //   }
    //   throw error;
    // }
  }
}
