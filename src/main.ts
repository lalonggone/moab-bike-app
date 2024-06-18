import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const app = createApp(App);

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    router.push('/');
  } else {
    // User is signed out
    router.push('/signup');
  }
});

app.use(router);
app.mount('#app');