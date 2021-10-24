import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@/pages/home/home.vue';
import SignIn from '@/pages/sign-in/sign-in.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;