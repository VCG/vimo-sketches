import axios from "axios";

  export async function getCypherQuery(vimo_server, data_server, data_version, token, motif, lim) {
    try {
      const res = await axios.post(
        `${vimo_server}/cypher`,
        {
          server: data_server,
          version: data_version,
          token: JSON.stringify(token),
          motif: motif,
          lim: lim
        }
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `${error.response.status}: ${error.response.data?.detail?.error}`
        )
      }
      throw error;
    }
  }

