<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button @click="googleSignIn">Sign in with Google</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  import { signInWithPopup } from 'firebase/auth';
  import { auth, googleProvider } from '../firebaseConfig';
  
  export default defineComponent({
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:3000/login', {
            email: this.email,
            password: this.password
          });
          console.log('User logged in:', response.data);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      },
      async googleSignIn() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          console.log('User signed in with Google:', user);
          // Optionally, send the user data to your backend for additional processing
        } catch (error) {
          console.error('Error signing in with Google:', error);
        }
      }
    }
  });
  </script>