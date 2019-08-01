import React from 'react';
import { connect } from 'dva';
import { ProductIdEnum } from '@/common/enums';
import Image, { ImgStore } from '@/components/atoms/Image';
import styles from './styles.less';

interface IProps {
  mobile: string;
  productId: ProductIdEnum;
  onProductIdChange: (productId: ProductIdEnum) => void;
}

class MemberType extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);
    this.onProductIdChange = this.onProductIdChange.bind(this);
  }
  onProductIdChange(productId: ProductIdEnum) {
    const { onProductIdChange } = this.props;
    onProductIdChange && onProductIdChange(productId);
  }

  render() {
    const { mobile, productId } = this.props;
    return (
      <div className={styles.memberTypeContainer}>
        <div className={styles.memberType}>
          <Image
            src={ImgStore.weekMember}
            onClick={this.onProductIdChange.bind(this, ProductIdEnum.WEEK_FOR_DOTA2)}
          />
          <div className={styles.info}>
            <label>number</label>
            <br />
            <span className={styles.mob}>{mobile}</span>
          </div>
          {productId === ProductIdEnum.WEEK_FOR_DOTA2 && (
            <div className={styles.memberTypeChecked} />
          )}
        </div>
        <div className={styles.memberType}>
          <Image
            src={ImgStore.monthMember}
            onClick={this.onProductIdChange.bind(this, ProductIdEnum.MONTH_FOR_DOTA2)}
          />
          <div className={styles.info}>
            <label>number</label>
            <br />
            <span className={styles.mob}>{mobile}</span>
          </div>
          {productId === ProductIdEnum.MONTH_FOR_DOTA2 && (
            <div className={styles.memberTypeChecked} />
          )}
        </div>
      </div>
    );
  }
}
interface ConnectState {
  auth: any;
}

export default connect((state: ConnectState) => ({
  mobile: state.auth.userInfo.mobile
}))(MemberType);
