import React from 'react';
import classnames from 'classnames';
import styles from './styles.less';
import BasicInfo from './BasicInfo';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import { globalDispatch } from '@/utils';
import { ActionType, NAMESPACE } from '@/models/constants';

interface IState {
  suggestion: string;
}
interface IProps {}
export default class Suggestion extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { suggestion: '' };
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextareaChange(e: any) {
    const { value = '' } = e.target;
    this.setState({ suggestion: value });
  }
  handleSubmit() {
    const { suggestion } = this.state;
    globalDispatch({
      type: `${NAMESPACE.AUTH}/${ActionType.send_feed_back}`,
      payload: { content: suggestion, onSuccess: () => this.setState({ suggestion: '' }) }
    });
  }

  render() {
    const { suggestion } = this.state;
    return (
      <div className={classnames(styles.userContainer, styles.fullHeight)}>
        <BasicInfo />
        <Textarea
          rows={10}
          cols={80}
          placeholder="请输入您的宝贵建议…"
          autoFocus={true}
          className={styles.textarea}
          onChange={this.handleTextareaChange}
          value={suggestion}
        />
        <Button onClick={this.handleSubmit} disabled={suggestion === ''}>
          提交
        </Button>
      </div>
    );
  }
}
