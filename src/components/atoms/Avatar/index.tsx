import React from 'react';
import { Avatar, Upload } from 'antd';
import { AvatarProps } from 'antd/lib/avatar';
import styles from './styles.less';
import Image from '../Image';
import ImgStore from '../Image/imgStore';
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
  if (!isJpgOrPng) {
    globalMessage('你只能上传.png或者.jpg图片', 'error');
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if (!isLt2M) {
  //   globalMessage('Image must smaller than 2MB!', 'error');
  // }
  // return isJpgOrPng && isLt2M;
  return isJpgOrPng;
}

interface IProps extends AvatarProps {
  canReUpload?: boolean;
}
interface IState {
  loading: boolean;
  imageUrl: string;
}

// TODO: 若其他地方用到 考虑将upload抽出
export default class CustomAvatart extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(info: UploadChangeParam<UploadFile>) {
    console.log(info);
    const status = info.file.status;
    switch (status) {
      case 'uploading':
        this.setState({ loading: true });
        break;
      case 'done':
        info.file.originFileObj &&
          getBase64(info.file.originFileObj, (imageUrl: any) =>
            this.setState({ imageUrl, loading: false })
          );
        break;
      case 'error':
        this.setState({ loading: false });
        break;
    }
  }

  render() {
    const { canReUpload = true, src, ...rest } = this.props;
    const { imageUrl } = this.state;
    const newSrc = imageUrl || src || ImgStore.defualt.avatar;
    return (
      <div className={styles.avatarContainer}>
        <Avatar {...rest} className={styles.avatar} src={newSrc} />
        {canReUpload && this.buildUploadIcon()}
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
      >
        <Image src={ImgStore.camera} className={styles.avatarCamera} />;
      </Upload>
    );
  }
}
