import React from 'react';
import { Tooltip } from 'antd';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  title?: string;
  alt?: string;
  src: string;
  height?: string | number;
  width?: string | number;
  text?: string;
  className?: string;
  textClassName?: string;
  textPostion?: 'top' | 'left' | 'bottom' | 'right';
  spacing?: number;
  onClick?: (e: React.MouseEvent) => void;
}
// FIXME: 轮播图每次轮播都会有5次render
class Image extends React.PureComponent<IProps> {
  // TODO: 若有传入，则使用传入的占位图，否则使用默认的占位图
  onError(e: React.SyntheticEvent<HTMLImageElement, Event>) {}

  render() {
    const {
      title,
      alt,
      src,
      height,
      width,
      text,
      className,
      textClassName,
      textPostion = 'right',
      spacing = 8,
      onClick
    } = this.props;
    const textSpacingStyle = { width: spacing, height: spacing };
    return (
      <Tooltip title={title}>
        <figure
          className={classnames(styles.figure, text && styles[textPostion], className)}
          onClick={onClick}
        >
          <img
            src={src}
            height={height}
            width={width}
            alt={alt}
            onError={this.onError}
            className={styles.img}
          />
          {text && (
            <>
              <span style={textSpacingStyle} />
              <figcaption className={classnames(styles.figcaption, textClassName)}>
                {text}
              </figcaption>
            </>
          )}
        </figure>
      </Tooltip>
    );
  }
}

export default Image;
