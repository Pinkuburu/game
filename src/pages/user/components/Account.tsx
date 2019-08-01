import React from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import BasicInfo from './BasicInfo';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { globalDispatch, globalMessage, isPassword } from '@/utils';
import { ActionType, NAMESPACE } from '@/models/constants';

interface IProps {}
interface IState {
  oldPassword: string;
  newPassword: string;
  rePassword: string;
}

enum InputType {
  OLD_PSW,
  NEW_PSW,
  RE_PSW
}
export default class Account extends React.Component<IProps, IState> {
  BasicInfo: React.RefObject<any>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    };
    this.BasicInfo = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  handleInputChange(e: any, type: InputType) {
    const { value } = e.target;
    switch (type) {
      case InputType.OLD_PSW:
        this.setState({ oldPassword: value });
        break;
      case InputType.NEW_PSW:
        this.setState({ newPassword: value });
        break;
      case InputType.RE_PSW:
        this.setState({ rePassword: value });
        break;
    }
  }
  handleSaveClick() {
    if (this.canSave()) {
      const { newName: name = '', newAvatar: img = '' } =
        (this.BasicInfo.current && this.BasicInfo.current.getWrappedInstance().getBasicInfo()) ||
        {};
      const { oldPassword: old_password, newPassword: new_password } = this.state;
      const tryEditAvatarAndName = img || name;
      const tryResetPassword = old_password || new_password;
      // 有更改才进行修改保存
      if (!tryResetPassword && !tryEditAvatarAndName) {
        globalMessage('并无更改信息', 'warn');
        return;
      }
      const newAvatarAndNameData = { name, img };
      const newPasswordData = { old_password, new_password };
      globalDispatch({
        type: `${NAMESPACE.AUTH}/${ActionType.do_edit_user_info}`,
        payload: {
          tryEditAvatarAndName,
          tryResetPassword,
          newAvatarAndNameData,
          newPasswordData,
          onSuccess: () => {
            this.BasicInfo.current &&
              this.BasicInfo.current.getWrappedInstance().resetCanEditName();
            this.setState({ oldPassword: '', newPassword: '', rePassword: '' });
          }
        }
      });
    }
  }

  canSave() {
    const { oldPassword, newPassword, rePassword } = this.state;
    if (oldPassword || newPassword || rePassword) {
      if (!oldPassword) {
        globalMessage('请输入原密码', 'warn');
        return false;
      }
      if (!newPassword) {
        globalMessage('请输入新密码', 'warn');
        return false;
      }
      if (!isPassword(oldPassword) || !isPassword(newPassword)) {
        globalMessage('请输入8-16位密码', 'warn');
        return false;
      }
      if (newPassword === oldPassword) {
        globalMessage('新密码不能与原密码相同', 'warn');
        return false;
      }
      if (newPassword !== rePassword) {
        globalMessage('两次输入的密码不一致', 'warn');
        return false;
      }
      return true;
    }
    return true;
  }

  render() {
    const { oldPassword, newPassword, rePassword } = this.state;
    return (
      <div className={classnames(styles.userContainer, styles.fullHeight)}>
        <BasicInfo readonly={false} ref={this.BasicInfo} />
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
            <label>原密码</label>
            <Input
              placeholder="请输入原密码"
              tag={InputType.OLD_PSW}
              minLength={8}
              maxLength={16}
              value={oldPassword}
              onChange={this.handleInputChange}
              type="password"
              name="old_password"
            />
          </div>
          <div className={styles.inputItem}>
            <label>新密码</label>
            <Input
              placeholder="设置新密码8-16个字符"
              tag={InputType.NEW_PSW}
              minLength={8}
              maxLength={16}
              value={newPassword}
              onChange={this.handleInputChange}
              type="password"
              name="new_password"
            />
          </div>
          <div className={styles.inputItem}>
            <label>确认密码</label>
            <Input
              placeholder="再次输入新密码"
              tag={InputType.RE_PSW}
              minLength={8}
              maxLength={16}
              value={rePassword}
              onChange={this.handleInputChange}
              type="password"
              name="re_password"
            />
          </div>
          <Button className={styles.button} onClick={this.handleSaveClick}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}
