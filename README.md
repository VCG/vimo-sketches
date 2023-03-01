# vimo-sketches
A React component of the Vimo Sketching interface.

## Use Component
We need a [vimo-server](https://github.com/VCG/vimo-server) to use the [vimo-sketches](https://github.com/VCG/vimo-sketches).

### Install Package
`npm install @vimo-public/vimo-sketches`

### Usage

#### General Case
```javascript
import { Sketch } from '@vimo-public/vimo-sketches';
```

```javascript
<Sketch processRequest={processRequest}/>
```

If you want to add constraint fields to node or edge, please refer react-awesome-query-builder [config fields](https://github.com/ukrbublik/react-awesome-query-builder/blob/master/CONFIG.adoc#configfields).

````javascript
const attributes = {
  NodeFields: {
    name: {
      label: "Name",
      type: "text",
    }
  },
  EdgeFields: {
    weight: {
      label: "Weight",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
  },
}

<Sketch processRequest={processRequest} attributes={attributes} />
````

#### neuPrint Case
```javascript
import { Sketch, NeuprintExecutor } from '@vimo-public/vimo-sketches';

const ne = new NeuprintExecutor(data_server, data_version, token, vimo_server);

const [isQuerying, setIsQuerying] = useState(false);
const processRequest = async (motifJson, lim) => {
    const query = await ne.json2cypher(motifJson, lim);
    console.log(query);
    return query;
};

const [attributes, setAttributes] = useState({
  getMotifCount: ne.getMotifCount,
  getRelativeMotifCount: ne.getRelativeMotifCount,
});

useEffect(async () => {
  setAttributes({
    isQuerying: isQuerying,
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
| token                 | neuPrint authentication token                           | String   |
| data_server           | url of database (e.g., 'https://neuprint.janelia.org/') | String   |
| data_version          | name and version of dataset (e.g., 'hemibrain:v1.2.1')  | String   |
| vimo_server           | url of vimo_server (e.g., 'http://localhost:4242')      | String   |

### Output
This component turns motif sketch into JSON. This is an example of the JSON:
```
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

