import React from 'react';
import { Container } from './Styled';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/interface';

// import classnames from 'classnames';

interface IProps<T> extends TableProps<T> {}

class CustomTable<T> extends React.Component<IProps<T>> {
  render() {
    return (
      <Container>
        <Table {...this.props} />
      </Container>
    );
  }
}

export default CustomTable;
