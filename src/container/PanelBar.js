import G6 from '@antv/g6'
import React, { Component } from 'react'
import styles from './index.css'
import { Input } from 'antd'
import dom from '../utils/dom'

export default class PanelBar extends Component {
  constructor(props) {
    super(props)

    const itemModel = props.item.getModel()
    this.state = {
      name: itemModel.name
    }
  }

  onChange = (e) => {
    const name = e.target.value
    this.setState({ name })
    this.props.updateNode(this.props.item, name)
  }

  render() {
    return (
      <div className={styles.panelBar}>
        <p>内容：</p>
        <Input.TextArea
          value={this.state.name}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
