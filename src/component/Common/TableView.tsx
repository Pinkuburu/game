import React from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';

export interface TableViewProps {
  cols: [];
  rows: [];
  [propsName: string]: any;
}
 
export interface TableViewState {
  [propsName: string]: any;
}
 
class TableView extends React.Component<TableViewProps, TableViewState> {
  cellRender(col, row, idx) {
    const info = _(row);
    if (Array.isArray(col.key)) {
      return col.render(info.at(col.key), row, col, idx);
    } else {
      return col.render(info.get(col.key, col.defaultData), row, col, idx);
    }
  }
  render() { 
    const { rows, cols, headHeight, bodyHeight } = this.props;
    return (
      <div>
        <Row style={{ height: headHeight }}>
          {cols.map((col, idx) => <Col span={col.span} key={`${col.title}-${idx}`}>{col.header ? col.header(rows, idx) : col.title}</Col>)}
        </Row>
        {rows.map((row, idx: number) => (
          <Row key={idx} style={{ height: bodyHeight }}>
            {cols.map((col, idx) => (
              <Col span={col.span} key={idx}>
              { col.render ?
                this.cellRender(col, row, idx) :
                _.get(row, col.key)
              }
              </Col>
            ))}
          </Row>
        ))}
      </div>
    );
  }
}
 
export default TableView;
