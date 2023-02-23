# vimo-sketches
A React component of the Vimo Sketching interface.

## Use Component
We need a [vimo-server](https://github.com/VCG/vimo-server) to use the [vimo-sketches](https://github.com/VCG/vimo-sketches).

### Install Package
`npm install @vimo-public/vimo-sketches`

### Usage
```javascript
import { Sketch } from '@vimo-public/vimo-sketches';
```

```javascript
<Sketch vimo_server={vimo_server} data_server={data_server} data_version={data_version} token={token} isQuerying={isQuerying} processRequest={processRequest}/>
```


### Props
| Name                  | Description                                             | Type     | 
|-----------------------|---------------------------------------------------------|----------|
| token                 | neuPrint authentication token                           | String   |
| data_server           | url of database (e.g., 'https://neuprint.janelia.org/') | String   |
| data_version          | name and version of dataset (e.g., 'hemibrain:v1.2.1')  | String   |
| isQuerying            | enable/disable search button                            | Boolean  |
| processRequest(query) | callback function for search button                     | Function |
| vimo_server           | url of vimo_server (e.g., 'http://localhost:4242')      | String   |

* Token can be found in [here](https://neuprint.janelia.org/account).

### Output
This component turns motif sketch into cypher query and calls processRequest with the query as a parameter.







### Ideas Neuprint Executor

```javascript
// constructor
ne = NeuprintExecutor(host, dataset, vimo-server, token)

// functions
nodeFields = ne.getNodeFields(args)
edgeFields = ne.getEdgeFields(args)
cypher = ne.json2cypher(json)
```
