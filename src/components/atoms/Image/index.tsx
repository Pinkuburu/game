import React from 'react';
import { Tooltip } from 'antd';
import { imgStore } from './imgStore';

interface IProps {
  title?: string;
  figure?: string;
  src?: string;
  type?: 'dota2' | 'lol' | 'csgo';
  figure_place?: string;
  figure_style?: any;
  height: string | number;
  width: string | number;
}

const Image: React.FC<IProps> = (props: IProps) => {
  const {
    title,
    src,
    type = 'lol',
    figure,
    figure_style: figureStyle,
    figure_place: figurePlace,
    height,
    width
  } = props;
  const spare = imgStore[type];
  return (
    <Tooltip title={title}>
      <img
        src={src || spare}
        height={height}
        width={width}
        alt=" "
        onError={
          spare &&
          ((e: any) => {
            e.target.src = spare;
          })
        }
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
