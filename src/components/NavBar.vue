<template>
    <nav>
      <router-link to="/">Home</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { signOut } from 'firebase/auth';
  import { auth } from '../firebaseConfig';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
      const logout = async () => {
        await signOut(auth);
        router.push('/signup');
      };
      return { logout };
    }
  });
  </script>
  
  <style scoped>
  nav {
    display: flex;
    gap: 1rem;
    background-color: #f8f9fa;
    padding: 1rem;
  }
  </style>