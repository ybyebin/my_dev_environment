import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'view-design/dist/styles/iview.css';
import './assets/less/reset.less'

import units from './assets/js/units'
import { pageData } from './assets/js/defaultData'
import { manageModule, page } from './assets/js/config'
import { handlePermission } from './assets/js/publicMethod'


import { Icon, Button, Table, Page, Modal, Message, DatePicker, Input, Breadcrumb, Tooltip, Card, Badge, Tree, Select, Option, Upload } from "view-design";
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("Table", Table);
Vue.component("Page", Page);
Vue.component("Modal", Modal);
Vue.component("Message", Message);
Vue.component("DatePicker", DatePicker);
Vue.component("Input", Input);
Vue.component("Breadcrumb", Breadcrumb);
Vue.component("Tooltip", Tooltip);
Vue.component("Card", Card);
Vue.component("Badge", Badge);
Vue.component("Tree", Tree);
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.component("Upload", Upload);



// 直接使用组件
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;

// 自定义方法及数据
Vue.prototype.units = units;
Vue.prototype.defaultData = pageData;
Vue.prototype.page = page;
Vue.prototype.manageModule = manageModule;
Vue.prototype.handlePermission = handlePermission;



Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
