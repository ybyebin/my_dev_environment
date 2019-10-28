import Vue from 'vue'
import Router from 'vue-router'
import { page } from '../assets/js/config'
import { systemLogin } from '../assets/js/publicMethod'

Vue.use(Router);

var router = new Router({
    //   mode: 'history',
    routes: [
       
    ]
});






router.beforeEach((to, from, next) => {
    // console.log(to.path)
    // if (to.path === '/') {
    //     systemLogin.setFlag('');
    // } else {
    //     systemLogin.setFlag(true);
    //     // console.warn('不存在')
    // }

    // console.log('-----')
    next()
});


export default router
