import React from 'react';
import { Avatar, Upload, Icon } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import styles from './styles.less';
import Image, { ImgStore } from '../Image';
import { globalMessage } from '../../../utils';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

// 转base64
function getBase64(img: File | Blob, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 图片上传之前进行一些限制
function beforeUpload(file: File | Blob) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isJpgOrPng || !isLt1M) {
    globalMessage('Image must smaller than 1MB!', 'error');
  }
  return isJpgOrPng && isLt1M;
}

interface IProps extends AvatarProps {
  canReUpload?: boolean;
}
interface IState {
  uploading: boolean;
  imageUrl: string;
}

// TODO: 若其他地方用到 考虑将upload抽出
export default class CustomAvatart extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    canReUpload: false
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      uploading: false,
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(info: UploadChangeParam<UploadFile>) {
    const status = info.file.status;
    switch (status) {
      case 'uploading':
        this.setState({ uploading: true });
        break;
      case 'done':
        info.file.originFileObj &&
          getBase64(info.file.originFileObj, (imageUrl: any) =>
            this.setState({ imageUrl, uploading: false })
          );
        break;
      case 'error':
        this.setState({ uploading: false });
        break;
    }
  }

  render() {
    const { canReUpload, src, ...rest } = this.props;
    const { imageUrl, uploading } = this.state;
    const newSrc = imageUrl || src;
    return (
      <div className={styles.avatarContainer}>
        <Avatar {...rest} className={styles.avatar} src={newSrc} alt="用户头像">
          {/* 图像加载失败时显示 */}
          <Image src={ImgStore.defualt.avatar} />;
        </Avatar>
        {canReUpload && this.buildUploadIcon()}
        {uploading && this.buildUploadingIcon()}
      </div>
    );
  }
  buildUploadingIcon() {
    return (
      <div className={styles.uploading}>
        <Icon type="loading" />
        <p>正在加载</p>
      </div>
    );
  }
  buildUploadIcon() {
    return (
      <Upload
        accept="image/*"
        showUploadList={false}
        onChange={this.handleChange}
        beforeUpload={beforeUpload}
        className={styles.upload}
      >
        <Image src={ImgStore.camera} className={styles.avatarCamera} />
      </Upload>
    );
  }
}
