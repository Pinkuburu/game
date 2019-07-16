import React from 'react';
import { Tooltip } from 'antd';
import styles from './styles.less';
interface IProps {
  title?: string;
  figure?: string;
  src: string;
  figure_place?: string;
  figure_style?: any;
  height: string | number;
  width: string | number;
}

const Image: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    src,
    figure,
    figure_style: figureStyle,
    figure_place: figurePlace,
    height,
    width
  } = props;
  return (
    <Tooltip title={title}>
      <img
        src={src}
        height={height}
        width={width}
        alt=" "
        onError={(e: any) => {
          e.target.src = src;
        }}
        className={styles.img}
      />
      {(figure || figurePlace || figureStyle) && (
        <span className={figurePlace} style={figureStyle}>
          {figure}
        </span>
      )}
    </Tooltip>
  );
};

export default Image;
