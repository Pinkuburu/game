// TODO: 重写Table
import React from 'react';

interface IProps {}

export interface ColoumProps<T> {
  key: string;
  title: string;
  align: 'left' | 'right' | 'center';
  className: string;
}

export default class CustomTable extends React.PureComponent<IProps> {
  render() {
    return <div>sadsa</div>;
  }
}
