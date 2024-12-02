// src/router/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue'; // Updated to reflect the correct folder
import Checkout from '@/pages/Checkout.vue'; // Updated to reflect the correct folder

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
