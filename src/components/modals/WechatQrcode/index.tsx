import React from 'react';
import CustomTabBar, { CustomTabPane } from '@/components/molecules/TabBar';
import Image from '@/components/atoms/Image';
import styles from './styles.less';
interface IProps {
  qrcode: string;
  price: number;
}

export default class WechatQrcode extends React.PureComponent<IProps> {
  static defaultProps = {
    qrcode: '',
    price: 999
  };
  render() {
    const { qrcode, price } = this.props;
    return (
      <CustomTabBar
        defaultActiveKey="wechatQrcode"
        isTabBarFullContainer={true}
        tabBarHeight="Big"
        isTabFullTabBar={true}
      >
        <CustomTabPane tab="微信支付" key="wechatQrcode" withoutActiveLine={true}>
          <div className={styles.qrcodeContainer}>
            <p className={styles.tip}>扫一扫付款</p>
            {qrcode && <Image src={qrcode} width={155} />}
            <p className={styles.price}>￥{price}</p>
          </div>
        </CustomTabPane>
      </CustomTabBar>
    );
  }
}
