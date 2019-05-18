import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from '@/store.js';
import ContactUs from './views/ContactUs.vue';
import Complaints from './views/Complaints.vue';
import Initiatives from './views/Initiatives.vue';
import ComplaintsAll from './components/ComplaintsAll.vue';
import ComplaintsMine from './components/ComplaintsMine.vue';
import ComplaintsAdd from './components/ComplaintsAdd.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: '',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/initiatives',
            name: 'initiatives',
            component: Initiatives
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs
        },
        {
            path: '/complaints',
            name: 'complaints',
            component: Complaints,
            children: [
                {
                    path: 'all',
                    name: 'ComplaintsAll',
                    component: ComplaintsAll
                },
                {
                    path: 'mine',
                    name: 'ComplaintsMine',
                    component: ComplaintsMine
                },
                {
                    path: 'add',
                    name: 'ComplaintsAdd',
                    component: ComplaintsAdd
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/sign-in'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
