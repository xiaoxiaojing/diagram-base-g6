import G6 from '@antv/g6'
import React from 'react'
import dom from '../utils/dom'
import ToolBar from './ToolBar'
import PanelBar from './PanelBar'
import styles from './index.css'

export default class G6Graph extends React.Component {
  constructor(props) {
    super(props)

    this.container = React.createRef()

    this.state = {
      height: window.innerHeight,
      open: false
    }
  }

  static defaultProps = {
    nodeLabelFill: '#0B73B3',
    nodeShapeStroke: '#00B7ED',
    groupLabelFill: '#DA7639',
    groupShapeStroke: '#FABE9C',
    edgeStroke: '#00AEEC'
  }

  _renderG6Graph() {
    const container = this.container.current
    const { height } = this.state
    const { edgeStroke, groupShapeStroke, nodeShapeStroke } = this.props

    if (this.net) {
      this.net.context.destroy()
    }

    // init
    const net = new G6.Net({
      container,
      height,
      grid: {
        forceAlign: true,
        cell: 20
      }
    })

    net.removeBehaviour(['clickAddNode'])
    net.addBehaviour(['mouseupAddNode'])

    net.edge().style({
      lineWidth: 2,
      stroke: edgeStroke
    })

    net.node()
      .label('name')
      .style({
        lineWidth: 3,
        stroke: nodeShapeStroke
      })

    // add edge
    let dragging = false
    net.on('dragstart', function (ev) {
      dragging = true
    })
    net.on('dragend', function (ev) {
      dragging = false
    })
    net.on('mouseenter', function (ev) {
      const shape = ev.shape;
      if (shape && shape.hasClass('anchor-point') && !dragging) {
        net.beginAdd('edge', {
          shape: 'smoothArrow'
        })
      }
    })
    net.on('mouseleave', function (ev) {
      const shape = ev.shape;
      if (shape && shape.hasClass('anchor-point') && !dragging) {
        net.changeMode('edit')
      }
    })

    // change node
    net.on('itemclick', ev => {
      this.setState({
        open: true,
        item: ev.item
      })
    })
    net.on('click', ev => {
      if (!ev.shape) {
        this.setState({
          open: false,
          item: null
        })
      }
    })

    net.render()

    this.net = net
  }

  componentWillMount() {
    const { nodeLabelFill } = this.props
    G6.Global.nodeLabelStyle.fill = nodeLabelFill
  }

  componentDidMount() {
    // add resize event
    this.windowListener = dom.addListener(window, 'resize', () => {
      this.setState({
        height: window.innerHeight
      })
    })

    // render graph
    this._renderG6Graph()
  }

  componentWillUnmount() {
    // remove resize event
    this.windowListener.remove()
  }

  addNodeHandler = (shape, name) => {
    this.net.beginAdd('node', {
      shape,
      name
    })
  }

  updateNodeHandler = (item, name) => {
    this.net.update(item, {
      name
    })
    this.net.refresh()
  }

  saveDataHandler = () => {
    console.log(this.net.save())
  }

  render() {
    return (
      <React.Fragment>
        <div className={styles['graph-container']} ref={this.container}></div>
        {this.state.open && <PanelBar item={this.state.item} updateNode={this.updateNodeHandler} />}
        <ToolBar net={this.net} className={styles['toolBar']} addNode={this.addNodeHandler} saveData={this.saveDataHandler} />
      </React.Fragment>
    )
  }
}
