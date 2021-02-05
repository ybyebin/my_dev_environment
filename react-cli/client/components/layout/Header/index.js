import React, { Component } from 'react';
import { Layout } from 'antd';

import './index.less';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realName: '小明',
    };
  }

  signOut = () => {
    console.log('退出');
  };

  render() {
    return (
      <Layout.Header className="page-header" style={{ padding: 0 }}>
        <div className="page-header-logo" />
        <span className="page-header-user">
          {this.state.realName}
          <span onClick={this.signOut}>退出</span>
        </span>
      </Layout.Header>
    );
  }
}

