# vimo-sketches
A React component of the Vimo Sketching interface.

## Use Component
We need a [vimo-server](https://github.com/VCG/vimo-server) to use the [vimo-sketches](https://github.com/VCG/vimo-sketches).

### Install Package
`npm install @vimo-public/vimo-sketches`

### Usage
`import { Sketch } from '@vimo-public/vimo-sketches';`


### Props
| Name         | Description                                             | Type    | 
|--------------|---------------------------------------------------------| ------- |
| token        | neuPrint authentication token                           | String  |
| data_server  | url of database (e.g., 'https://neuprint.janelia.org/') | String  |
| data_version | name and version of dataset (e.g., 'hemibrain:v1.2.1')  | String  |

* Token can be found in [here](https://neuprint.janelia.org/account).

### Output
This is an example of the search results.
```javascript
[
  { name: "Motif Instance 0",
    neurons:[ 
      {
        ...,
        nodeKey: "A",
        ...,
      },
      {
        ...,
        nodeKey: "B",
        ...,
      },
    ]
  },
  { name: "Motif Instance 1",
    neurons:[ 
      {
        ...,
        nodeKey: "A",
        ...,
      },
      {
        ...,
        nodeKey: "B",
        ...,
      },
    ]
  }
]
```
