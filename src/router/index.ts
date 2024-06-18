import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: UserProfile }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;