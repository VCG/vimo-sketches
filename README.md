[![npm version](https://img.shields.io/npm/v/@vimo-public/vimo-sketches.svg?color=1a8cff&style=flat-square)](https://www.npmjs.com/package/@vimo-public/vimo-sketches)
[![Demo](https://img.shields.io/badge/demo-running-blue.svg?colorB=4AC8F4)](https://vimo-client-3jagpvnfya-uc.a.run.app/)
[![doi](https://img.shields.io/badge/doi-10.1109%2FTVCG.2017.2745978-purple.svg?colorB=C46CFD)](https://doi.org/10.1101/2022.12.09.519772)


# Vimo Sketches
React component for interactively sketching & searching for network motifs.

<p>
  <img src="https://github.com/VCG/vimo-sketches/blob/main/examples/vimo-sketching.gif" />
</p>

### Requirements
* [npm](https://www.npmjs.com/) (8.1.0 or later)

### Install Package
``` bash
npm install @vimo-public/vimo-sketches
```

### Getting Started

#### Basic Example
```javascript
import {Sketch} from "@vimo-public/vimo-sketches";

function App() {
    const processRequest = async (motifJson, lim) => {
        console.log("This function is called upon clicking the search button.");
    };
    return (
        <div>
            <Sketch processRequest={processRequest}/>
        </div>
    );
}
export default App;
```

#### Node & Edge Attributes
If you want to add attributes to nodes or edges, please refer react-awesome-query-builder [config fields](https://github.com/ukrbublik/react-awesome-query-builder/blob/master/CONFIG.adoc#configfields). Also here's an example

````javascript
const attributes = {
  NodeFields: {
    node_attr_1: {
      label: "attr1_name",
      type: "text",
    },
    node_attr_2: {
      label: "attr2_name",
      type: "select",
      fieldSettings: {
        showSearch: true,
        listValues: [
          "alpha",
          "betha",
          "theta",
        ],
      },
      valueSources: ["value"],
      operators: ["select_equals", "select_not_equals"],
    },
  },
  EdgeFields: {
    edge_attr_1: {
      label: "attr1_name",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    edge_attr_2: {
      label: "attr2_name",
      type: "number",
      operators: ["greater", "less", "equal"],
      valueSources: ["value"],
    },
  },
}

<Sketch processRequest={processRequest} attributes={attributes} />
````

#### Searching Motifs in NeuPrint

We provide a direct interface to sketch & search for networks motifs in large [connectome](https://en.wikipedia.org/wiki/Connectomics) data sets hosted on [Neuprint](https://neuprint.janelia.org). Here's an example of how to use it.

```javascript
import { Sketch, NeuprintExecutor } from '@vimo-public/vimo-sketches';

// the NeuprintExecutor class is used to interact with the Neuprint database
const ne = new NeuprintExecutor(data_server, data_version, token, vimo_server);

const [isQuerying, setIsQuerying] = useState(false);

const processRequest = async (motifJson, lim) => {
    const query = await ne.json2cypher(motifJson, lim);
    console.log(query);
    return query;
};

const [attributes, setAttributes] = useState({
  getMotifCount: ne.getMotifCount, // get count of motif in network
  getRelativeMotifCount: ne.getRelativeMotifCount, // get relative count of motif in network
  isQuerying: isQuerying,
});

useEffect(async () => {
  setAttributes({
    ...attributes,
    NodeFields: await ne.getNodeFields(),
    EdgeFields: await ne.getEdgeFields(),
  });
}, []);

<Sketch processRequest={processRequest} attributes={attributes}/>
```

### Sketch Component Props
<table>
<thead>
<tr>
<th align="left">Name</th>
<th align="left">Sub-field</th>
<th align="left">Description</th>
<th align="left">Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>processRequest(query)</td>
<td>N/A</td>
<td>callback function for search button</td>
<td>Function</td>
</tr>
<tr>
<td rowspan="5">attributes</td>
<td>isQuerying</td>
<td>enable/disable search button</td>
<td>Boolean</td>
</tr>
<tr>
<td>NodeFields</td>
<td>constraint fields for node</td>
<td>Object</td>
</tr>
<tr>
<td>EdgeFields</td>
<td>constraint fields for edge</td>
<td>Object</td>
</tr>
<tr>
<td>getMotifCount</td>
<td>get count of motif in network</td>
<td>Function</td>
</tr>
<tr>
<td>getRelativeMotifCount</td>
<td>get relative count of motif in network</td>
<td>Function</td>
</tr>
</tbody>
</table>


* Token can be found in [here](https://neuprint.janelia.org/account).

### NeuprintExecutor Parameters
| Name                  | Description                                             | Type     | 
|-----------------------|---------------------------------------------------------|----------|
| token                 | [neuPrint authentication token](https://neuprint.janelia.org/account)                       | String   |
| data_server           | url of database (e.g., 'https://neuprint.janelia.org/') | String   |
| data_version          | name and version of dataset (e.g., 'hemibrain:v1.2.1')  | String   |
| vimo_server           | url of vimo_server (e.g., 'http://localhost:4242')      | String   |

### Output
This component turns motif sketch into JSON. This is an example of the JSON. This JSON can be converted to a Cypher query using the `json2cypher` method of the NeuprintExecutor class.
``` javascript
{
    nodes: [
      {
        label: "A",
        properties: null,
        index: 0,
        position: ["Point", 149.70313, 66.80469],
      },
      {
        label: "B",
        properties: null,
        index: 1,
        position: ["Point", 84.70313, 173.80469],
      },
      {
        label: "C",
        properties: null,
        index: 2,
        position: ["Point", 232.70313, 165.80469],
      },
    ],
    edges: [
      {
        label: "A -> B",
        properties: null,
        index: 0,
        indices: [0, 1],
        tree: null,
      },
      {
        label: "B -> C",
        properties: null,
        index: 1,
        indices: [1, 2],
        tree: null,
      },
      {
        label: "C -> A",
        properties: null,
        index: 2,
        indices: [2, 0],
        tree: null,
      },
    ],
    dimension: { width: 639.3984375, height: 232.796875 },
};
```


### Citing
If you find our work helpful, please consider citing it.
```bibtex
@article {troidl2022vimo,
    title={Vimo: Visual Analysis of Neuronal Connectivity Motifs},
    author={Troidl, Jakob and Warchol, Simon and Choi, Jinhan and Matelsky, Jordan 
    and Dhanysai, Nagaraju and Wang, Xueying and Wester, Brock and Wei, Donglai 
    and Lichtman, Jeff W and Pfister, Hanspeter and Beyer, Johanna},
    year={2022},
    doi={10.1101/2022.12.09.519772},
    publisher={Cold Spring Harbor Laboratory},
    url={https://www.biorxiv.org/content/early/2022/12/11/2022.12.09.519772},
    journal={bioRxiv}
}
```

