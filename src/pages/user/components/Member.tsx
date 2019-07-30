import React from 'react';
import { Checkbox } from 'antd';

import styles from './styles.less';
import { GameTypeEnum, PayWayEnum, ProductIdEnum } from '@/common/enums';
import Image from '@/components/atoms/Image';
import ImgStore from '@/components/atoms/Image/imgStore';
import RadioGroup from '@/components/atoms/RadioGroup';
import CheckboxGroup from '@/components/atoms/CheckBoxGroup';
import Button from '@/components/atoms/Button';
import WechatQrcodeModal from '@/components/modals/WechatQrcode';
import { ActionType, NAMESPACE } from '@/models/constants';
import { globalDispatch, globalOpenModal } from '@/utils';

import MemberType from './MemberType';
import BasicInfo from './BasicInfo';

const payWayOptions = [
  { label: '微信支付', value: PayWayEnum.wechatPay },
  { label: '支付宝支付', value: PayWayEnum.aliPay }
];
const gameTypeOptions = [
  { label: 'DOTA2', value: GameTypeEnum.DOTA2 }
  // { label: 'LOL', value: GameTypeEnum.LOL },
  // { label: 'CSGO', value: GameTypeEnum.CSGO }
];
function getPriceFromProductId(productId: ProductIdEnum) {
  switch (productId) {
    case ProductIdEnum.WEEK_FOR_DOTA2:
      return 38;
    case ProductIdEnum.MONTH_FOR_DOTA2:
      return 88;
    default:
      return 9999;
  }
}
interface IProps {}

interface IState {
  price: number;
  payWay: PayWayEnum;
  gameType: GameTypeEnum;
  productId: ProductIdEnum;
  isAcceptTerms: boolean;
}

export default class Member extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      price: getPriceFromProductId(ProductIdEnum.WEEK_FOR_DOTA2),
      payWay: PayWayEnum.wechatPay,
      gameType: GameTypeEnum.DOTA2,
      productId: ProductIdEnum.WEEK_FOR_DOTA2,
      isAcceptTerms: false
    };
    this.handleProductIdChange = this.handleProductIdChange.bind(this);
    this.handlePayWayChange = this.handlePayWayChange.bind(this);
    this.handleGameTypeChange = this.handleGameTypeChange.bind(this);
    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
    this.handleOpemMemberShip = this.handleOpemMemberShip.bind(this);
  }
  handleProductIdChange(productId: ProductIdEnum) {
    this.setState({ productId, price: getPriceFromProductId(productId) });
  }
  handlePayWayChange(e: any) {
    const { value } = e.target;
    this.setState({ payWay: value });
  }
  handleGameTypeChange(e: any) {
    const { value } = e.target;
    this.setState({ gameType: value });
  }
  handleCheckboxGroupChange(checkedList: any[]) {
    this.setState({ isAcceptTerms: checkedList.includes('accept') });
  }
  handleOpemMemberShip() {
    const { productId: product_id, payWay } = this.state;
    globalDispatch({
      type: `${NAMESPACE.AUTH}/${ActionType.do_open_membership}`,
      payload: {
        type: payWay,
        product_id,
        onGenerateWechatOrderSuccess: (qrData: string) =>
          globalOpenModal(<WechatQrcodeModal qrcode={`data:image/png;base64,${qrData}`} />)
      }
    });
  }
  render() {
    const { productId, price, payWay, gameType, isAcceptTerms } = this.state;
    return (
      <>
        <div className={styles.userContainer}>
          <BasicInfo />
          <MemberType productId={productId} onProductIdChange={this.handleProductIdChange} />
          <div className={styles.payInfoContainer}>
            共计: <span className={styles.price}>￥{price}</span>
            <div className={styles.radioGroupContainer}>
              开通方式:
              <RadioGroup
                options={payWayOptions}
                className={styles.radioGroup}
                value={payWay}
                onChange={this.handlePayWayChange}
              />
            </div>
            <div className={styles.radioGroupContainer}>
              选择游戏:
              <RadioGroup
                options={gameTypeOptions}
                value={gameType}
                onChange={this.handleGameTypeChange}
              />
            </div>
            <div className={styles.acceptTerms}>
              <CheckboxGroup onChange={this.handleCheckboxGroupChange}>
                <Checkbox value="accept">接受并同意</Checkbox>
              </CheckboxGroup>
              <a>《电竞鹰眼会员条款》</a>
            </div>
            <Button onClick={this.handleOpemMemberShip} disabled={!isAcceptTerms}>
              开通会员
            </Button>
          </div>
        </div>
        <div className={styles.userContainer}>
          <Image src={ImgStore.privileges.privileges} text="会员特权" />
          <div className={styles.privilegesList}>
            {privilegesList.map((item) => (
              <Image
                key={item.text}
                text={item.text}
                src={item.icon}
                textPostion="bottom"
                className={styles.item}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

const privilegesList = [
  { text: '联赛预测', icon: ImgStore.privileges.privileges1 },
  { text: '全面数据', icon: ImgStore.privileges.privileges2 },
  { text: '直播推荐', icon: ImgStore.privileges.privileges3 },
  { text: '个性标识', icon: ImgStore.privileges.privileges4 },
  { text: '功能尝鲜', icon: ImgStore.privileges.privileges5 }
];
