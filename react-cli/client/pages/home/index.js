import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import request from '@utils/request';

export default class Home extends React.Component {
  componentDidMount() {
    request({
      url: `/mock/1337/api/mock/test`,
      des: '测试接口',
    }).then(res => {
      console.log(res.data);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Button>2222</Button>
        <input />
       2
      </div>
    );
  }
}
