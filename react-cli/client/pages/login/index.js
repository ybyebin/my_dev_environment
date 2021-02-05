import React from 'react';
import { Form, Input, Button, message } from 'antd';
import particles from 'particles.js';
import './index.less';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checking: false };
  }

  componentDidMount() {
    particlesJS.load('particles', '/static/json/particles.json')
  }

  async handleSubmit(params) {
    const { username, password } = params;
    const { checking } = this.state;

    if (checking) return;

    this.setState({ checking: true });

    try {
      console.log(username);
      console.log(password);
      this.setState({ checking: false });
    } catch (error) {
      this.setState({ checking: false });
      message.error(error.message);
    }
  }

  handleForgetPassword() {
    const nextPage = encodeURIComponent(window.location.origin);
    window.location.href = `http://login.koolearn.com/sso/toBackPwd.do?nextPage=${nextPage}`;
  }

  render() {
    const { checking } = this.state;

    return (
      <div className="login" id="particles">
        <Form
          className="login-form"
          onFinish={params => this.handleSubmit(params)}
        >
          <h1>触达策略平台</h1>
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入手机/用户名/注册邮箱' }]}
          >
            <Input placeholder="请输入手机/用户名/注册邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item className="button-group">
            <Button type="link" onClick={() => this.handleForgetPassword()}>
              忘记密码?
            </Button>
            <Button type="primary" htmlType="submit" loading={checking}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
