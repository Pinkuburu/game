import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, withRouter, match } from 'dva/router';
import { message } from 'antd';
import { History, Location } from 'history';
import { NAMESPACE } from '../../../common/constant';

interface IProps {
  history: History;
  location: Location;
  match: match;
  isLogined: boolean;
}

class AuthRouter extends React.PureComponent<IProps> {
  render() {
    const { children, isLogined, ...rest } = this.props;
    if (!isLogined) {
      message.warning('您需要先登陆');
    }
    return (
      <Route
        {...rest}
        render={() =>
          isLogined ? <React.Fragment>{children}</React.Fragment> : <Redirect to="/" />
        }
      />
    );
  }
}

function mapStateToProps(state: any) {
  return {
    isLogined: state[NAMESPACE.AUTH].isLogined
  };
}

// export default ListData;
export default connect(mapStateToProps)(withRouter(AuthRouter));
