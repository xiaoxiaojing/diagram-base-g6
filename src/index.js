import './index.css'
import 'antd/dist/antd.css'

import React from 'react'
import ReactDOM from 'react-dom'
import G6Graph from './container/G6Graph'

const data = {
  "nodes": [
    {
      "x": 140,
      "y": 210,
      "name": "node1",
      "id": "node1"
    },
    {
      "x": 270,
      "y": 210,
      "name": "node2",
      "id": "node2"
    }
  ],
  "edges": [
    {
      "shape": "arrow",
      "source": "node1",
      "id": "edge1",
      "target": "node2"
    }
  ]
}

ReactDOM.render((
  <G6Graph graphData={data} />
), document.getElementById('root'));
