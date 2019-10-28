import Vue from 'vue'
import App from './person.vue'
import '../../assets/less/reset.less'
import 'vue-ydui/dist/ydui.base.css'
Vue.config.productionTip = false
  
new Vue({
    render: h => h(App)
}).$mount('#app')