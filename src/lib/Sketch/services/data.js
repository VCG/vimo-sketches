import axios from "axios";

export async function getCypherQuery(
  vimo_server,
  data_server,
  data_version,
  token,
  motif,
  lim
) {
  try {
    const res = await axios.post(`${vimo_server}/cypher`, {
      server: data_server,
      version: data_version,
      token: JSON.stringify(token),
      motif: motif,
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

export async function getNodeFields(
  vimo_server,
  data_server,
  data_version,
  token
) {
  try {
    const res = await axios.post(`${vimo_server}/fetch_node_fields`, {
      server: data_server,
      version: data_version,
      token: JSON.stringify(token),
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

export async function getNeuronAttributes(
  vimo_server,
  data_server,
  data_version,
  token
) {
  try {
    const res = await axios.post(`${vimo_server}/fetch_neuron_attributes`, {
      server: data_server,
      version: data_version,
      token: JSON.stringify(token),
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

export async function getEdgeFields(
  vimo_server,
  data_server,
  data_version,
  token
) {
  try {
    const res = await axios.post(`${vimo_server}/fetch_edge_fields`, {
      server: data_server,
      version: data_version,
      token: JSON.stringify(token),
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
