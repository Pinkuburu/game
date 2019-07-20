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
  textClassName?: string;
  textPostion?: 'top' | 'left' | 'bottom' | 'right';
  spacing?: number;
  onClick?: (e: React.MouseEvent) => void;
}
// FIXME: 轮播图每次轮播都会有5次render
const Image: React.FC<IProps> = ({
  title,
  alt,
  src,
  height,
  width,
  text,
  textClassName,
  textPostion = 'right',
  spacing = 8,
  onClick
}: IProps) => {
  const textSpacingStyle = { width: spacing, height: spacing };
  return (
    <Tooltip title={title}>
      <figure className={classnames(styles.figure, text && styles[textPostion])} onClick={onClick}>
        <img
          src={src}
          height={height}
          width={width}
          alt={alt}
          onError={(e: any) => {
            e.target.src = src;
          }}
          className={styles.img}
        />
        {text && (
          <>
            <span style={textSpacingStyle} />
            <figcaption className={classnames(styles.figcaption, textClassName)}>{text}</figcaption>
          </>
        )}
      </figure>
    </Tooltip>
  );
};

// class Image extends React.PureComponent<IProps> {
//   render() {
//     const {
//       title,
//       alt,
//       src,
//       height,
//       width,
//       text,
//       textClassName,
//       textPostion = 'Bottom',
//       spacing = 5
//     } = this.props;
//     const textSpacingStyle = { width: spacing, height: spacing };
//     console.log(textSpacingStyle);
//     return (
//       <Tooltip title={title}>
//         <figure className={classnames(styles.figure, text && styles[textPostion])}>
//           <img
//             src={src}
//             height={height}
//             width={width}
//             alt={alt}
//             onError={(e: any) => {
//               e.target.src = src;
//             }}
//             className={styles.img}
//           />
//           {text && (
//             <React.Fragment>
//               <span style={textSpacingStyle} />
//               <figcaption className={classnames(textClassName, styles.text)}>{text}</figcaption>
//             </React.Fragment>
//           )}
//         </figure>
//       </Tooltip>
//     );
//   }
// }

export default Image;
