import Vue from 'vue'
import App from './page2.vue'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
            
new Vue({
    render: h => h(App)
}).$mount('#app')