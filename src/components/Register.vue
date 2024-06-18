<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="name" placeholder="Name" required />
        <input v-model="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            name: this.name,
            email: this.email,
            password: this.password
          });
          console.log('User registered:', response.data);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
    }
  });
  </script>