import axios from "axios";

export async function queryMotifs(motif, number, token) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_URL}/search`,
      {
        data_server: 'https://neuprint.janelia.org/',
        data_version: 'hemibrain:v1.2.1',
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
