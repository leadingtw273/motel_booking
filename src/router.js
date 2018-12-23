import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserOrder from './views/UserOrder.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/Home',
            name: 'home',
            component: Home
        },
        {
            path: '/Order',
            name: 'order',
            component: UserOrder
        }
    ]
});
