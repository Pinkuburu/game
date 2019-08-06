import React from 'react';
import { Carousel, Tooltip } from 'antd';
import Image from '../../../../components/atoms/Image/index';
import * as DataType from '../../../../common/interfaces/dataType';
import styles from './styles.less';
import classnames from 'classnames';

interface IProps {
  imgUrls: DataType.BannersImg[];
  className?: string;
}
interface IState {
  index: number;
}

// 可以考虑抽离出来，目前只有首页用上
// TODO: 无图时的占位图
class CarouselView extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    imgUrls: []
  };

  constructor(props: IProps) {
    super(props);
    this.state = { index: 0 };
  }

  render() {
    const { className, imgUrls } = this.props;
    const customPaging = function (i:number) {
      const { description, id, img_url: src } = imgUrls[i];
      return (
        <Tooltip title={description}>
          <a className={styles.thumbNail}>
            <img src={src} alt={description} />
          </a>
        </Tooltip>
      )
    }
    return (
      <div className={classnames(className, styles.container)}>
        <Carousel
          speed={500}
          autoplay={true}
          className={styles.defaultCarousel}
          dots={true}
          customPaging={customPaging}
        >
          {imgUrls.map(({ id, img_url: src }, index) => (
            <Image key={id && index} height={300} src={src} />
          ))}
        </Carousel>
      </div>
    );
  }
}

export default CarouselView;
