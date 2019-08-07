import React from 'react';
import { Tooltip } from 'antd';
import styles from './styles.less';
import ImgStore from './imgStore';
import classnames from 'classnames';

export { ImgStore };

interface IProps {
  title?: string;
  alt?: string;
  src?: string;
  height?: string | number;
  width?: string | number;
  text?: string;
  className?: string;
  textClassName?: string;
  textPostion?: 'top' | 'left' | 'bottom' | 'right';
  spacing?: number;
  onClick?: (e: React.MouseEvent) => void;
  defaultSrc?: string;
  fit?: 'fill' | 'cover' | 'contain';
}
// FIXME: 轮播图每次轮播都会有5次render
class Image extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.onError = this.onError.bind(this);
  }

  // 若有传入，则使用传入的占位图，否则使用默认的占位图(暂时用头像替代)
  onError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const { defaultSrc } = this.props;
    e.currentTarget.src = defaultSrc || ImgStore.defualt.broken;
  }

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
      onClick,
      fit = 'fill'
    } = this.props;
    const textSpacingStyle = { width: spacing, height: spacing };
    return (
      <Tooltip title={title}>
        <figure
          className={classnames(styles.figure, text && styles[textPostion], className)}
          onClick={onClick}
        >
          <img
            src={src || 'default'}
            height={height}
            width={width}
            alt={alt}
            onError={this.onError}
            className={classnames(styles.img, styles[fit])}
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
