import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, PieChartOutlined } from '@ant-design/icons';
import './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

const navConfig = [
  {
    key: 1,
    path: '',
    text: '运营管理',
    power: true,
    children: [
      {
        key: 11,
        path: '/taskList',
        text: '任务管理',
        power: true,
      },
    ],
  },
  {
    key: 2,
    path: '',
    text: '配置管理',
    power: true,
    children: [
      {
        key: 21,
        path: '/process',
        text: '流程管理',
        power: true,
      },
    ],
  },
];

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  changeItem = key => {};

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {navConfig.map(item => {
            if (item.power) {
              if (item.children && item.children.length) {
                return (
                  <SubMenu
                    key={item.key}
                    icon={<UserOutlined />}
                    title={item.text}
                  >
                    {item.children.map(child => {
                      if (child.power) {
                        return (
                          <Menu.Item
                            key={child.key}
                            onClick={() => {
                              this.changeItem(child.key);
                            }}
                          >
                            <Link className="page-sidebar-link" to={child.path}>
                              {child.text}
                            </Link>
                          </Menu.Item>
                        );
                      }
                      return child.key;
                    })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.key}
                    onClick={() => {
                      this.changeItem(item.key);
                    }}
                    icon={<PieChartOutlined />}
                  >
                    <Link to={item.path}>{item.text}</Link>
                  </Menu.Item>
                );
              }
            }
            return item.key;
          })}
        </Menu>
      </Sider>
    );
  }
}
