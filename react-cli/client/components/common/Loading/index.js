import React from 'react';
import ReactDom from 'react-dom';
import { Spin } from 'antd';
import './index.less';

export class Loading {
  constructor() {
    this.tasks = {};
    this.loading = false;
    this.initElement();
  }

  checkTasks() {
    const tasksAmount = Object.keys(this.tasks).length;
    switch (tasksAmount) {
      case 0: {
        this.destory();
        break;
      }
      case 1: {
        this.create();
        break;
      }
    }
  }

  initElement() {
    this.root = document.createElement('div');
    this.container = document.createElement('div');
    this.root.appendChild(this.container);
    this.root.className = 'loading-root';
  }

  show(key) {
    this.tasks[key] = true;
    this.checkTasks();
  }

  hide(key) {
    delete this.tasks[key];
    this.checkTasks();
  }

  create() {
    document.body.appendChild(this.root);
    ReactDom.render(<Spin size="large" />, this.container);
  }

  destory() {
    if (this.root.parentNode) {
      ReactDom.unmountComponentAtNode(this.container);
      this.root.parentNode.removeChild(this.root);
    }
  }
}

export default new Loading();
