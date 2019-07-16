import React from 'react';
import { Carousel } from 'antd';
import Image from '../../../../components/atoms/Image/index';
import * as ReturnDataType from '../../../../common/interfaces/returnData';
import styles from './styles.less';
import classnames from 'classnames';
import { Tooltip } from 'antd';

interface IProps {
  imgUrls: ReturnDataType.BannersImg[];
  className?: string;
}
interface IState {
  index: number;
}

// 可以考虑抽离出来，目前只有首页用上
// TODO: 无图时的占位图
class CarouselView extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      index: 0
    };

    this.carousel = React.createRef();

    this.beforeChange = this.beforeChange.bind(this);
    this.changeCurrentIndex = this.changeCurrentIndex.bind(this);
  }
  static defaultProps = {
    imgUrls: []
  };

  carousel: React.RefObject<any>;

  beforeChange(from: number, to: number) {
    this.setState({ index: to });
  }

  changeCurrentIndex(index: number) {
    this.carousel.current && this.carousel.current.goTo(index);
  }

  render() {
    const { className, imgUrls } = this.props;
    const { index: currentIndex } = this.state;

    return (
      <div className={classnames(className, styles.container)}>
        <Carousel
          speed={500}
          autoplay={true}
          className={styles.defaultCarousel}
          dots={false}
          beforeChange={this.beforeChange}
          ref={this.carousel}
        >
          {imgUrls.map(({ id, img_url: src }, index) => (
            <Image key={id && index} width={1120} height={300} src={src} />
          ))}
        </Carousel>
        <div className={styles.slickDots}>
          {imgUrls.map(({ id, img_url: src, description }, index) => (
            <Tooltip title={description} key={id && index}>
              <button
                style={{ backgroundImage: `url(${src})` }}
                className={classnames(styles.button, {
                  [styles.buttonActive]: currentIndex === index
                })}
                onClick={this.changeCurrentIndex.bind(this, index)}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    );
  }
}

export default CarouselView;
