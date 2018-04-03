import G6 from '@antv/g6'
import React, { Component } from 'react'
import styles from './index.css'
import { Button, Row, Col } from 'antd'
import dom from '../utils/dom'

export default class ToolBar extends Component {
  render() {
    const { addNode, saveData } = this.props
    return (
      <div
        className={styles.toolBar}
      >
        <Row type="flex" justify="space-between">
          <Col span={10}>
            <Button onMouseDown={addNode.bind(null, 'rect', 'node')}>正方形</Button>
            <Button onMouseDown={addNode.bind(null, 'circle', 'node')}>圆形</Button>
            <Button onMouseDown={addNode.bind(null, 'rhombus', 'node')}>菱形</Button>
          </Col>
          <Col span={3}>
            <Button type="primary" onClick={saveData}>保存</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
