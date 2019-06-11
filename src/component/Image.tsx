import React from 'react';
import { Tooltip } from 'antd';
import { imgStore } from '../utils/imgStore';

interface ImageProps {
  title?: string;
  figure?: string;
  src?: string;
  type?: string;
  figure_place?: string;
  figure_style?: object;
  height: string | number;
  width: string | number;
}

function Image(props: ImageProps) {
  const { title, src, type, figure, figure_style, figure_place, height, width } = props;
  const spare = imgStore[type];
  return (
    <Tooltip title={title}>
      <img
        src={src || spare}
        height={height}
        width={width}
        alt=" "
        onError={spare && (e => e.target.src = spare)}
      />
      {(figure || figure_place || figure_style) && (
      <span
        className={`figure-${figure_place}`}
        style={figure_style}
      >
        {figure}
      </span>)}
    </Tooltip>
  );
}

export default Image;
