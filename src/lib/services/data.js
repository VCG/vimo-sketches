import axios from "axios";

export async function queryMotifs(motif, number, data_server, data_version, token) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}/search`,
      {
        data_server: data_server,
        data_version: data_version,
        withCredentials: true,
        motif: motif,
        lim: number,
        token: JSON.stringify(token),
      }
    );
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
  export async function getCypherQuery(server, version, token, motif, lim) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}/cypher`,
        {
          server: server,
          version: version,
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