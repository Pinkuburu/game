import React from 'react';
import styles from './styles.less';
import { GameTypeEnum } from '../../../common/enums';
import BasicInfo from './BasicInfo';
import Image from '../../../components/atoms/Image';
import ImgStore from '../../../components/atoms/Image/imgStore';
import RadioGroup from '../../../components/atoms/RadioGroup';
import CheckboxGroup from '../../../components/atoms/CheckBoxGroup';
import { Checkbox } from 'antd';

enum PayWay {
  aliPay,
  wechatPay
}
const payWayOptions = [
  { label: '微信支付', value: PayWay.wechatPay },
  { label: '支付宝支付', value: PayWay.aliPay }
];
const gameTypeOptions = [
  { label: 'Dota2', value: GameTypeEnum.DOTA2 },
  { label: 'LOL', value: GameTypeEnum.LOL },
  { label: 'Csgo', value: GameTypeEnum.CSGO }
];
interface IProps {
  userInfo: any;
  userMemberInfo: any[];
}

interface IState {
  price: number;
  payWay: PayWay;
  gameType: GameTypeEnum;
}
export default class Member extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      price: 0,
      payWay: PayWay.aliPay,
      gameType: GameTypeEnum.DOTA2
    };
  }
  render() {
    const { userInfo, userMemberInfo } = this.props;
    return (
      <div>
        <div className={styles.userContainer}>
          <BasicInfo userInfo={userInfo} userMemberInfo={userMemberInfo} />
          <div>
            {/* <Image src={ImgStore.weekMember} />
            <Image src={ImgStore.monthMember} /> */}
            <span>共计:￥38</span>
            <div>
              <RadioGroup options={payWayOptions} />
            </div>
            <div>
              <RadioGroup options={gameTypeOptions} />
            </div>
            <div>
              <CheckboxGroup>
                <Checkbox>接受并同意</Checkbox>
              </CheckboxGroup>
              <a>《电竞鹰眼会员条款》</a>
            </div>
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
      </div>
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
