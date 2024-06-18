import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/signup', component: Signup },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next('/signup');
  } else if (user && (to.path === '/login' || to.path === '/signup' || to.path === '/register')) {
    next('/');
  } else {
    next();
  }
});

export default router;