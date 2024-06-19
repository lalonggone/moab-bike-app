<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <select v-model="accountType" required>
        <option value="individual">Individual</option>
        <option value="organization">Organization</option>
      </select>
      <button type="submit">Register</button>
    </form>
    <p class="login-prompt">
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const accountType = ref('individual'); // Default value

    const register = async () => {
      try {
        const response = await axios.post('http://localhost:3000/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          account_type: accountType.value
        });
        console.log('User registered:', response.data);
        router.push('/login');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };

    return {
      name,
      email,
      password,
      accountType,
      register
    };
  }
});
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #0078d4;
  color: white;
  cursor: pointer;
}

.login-prompt {
  margin-top: 1rem;
}

.login-prompt a {
  color: #0078d4;
  text-decoration: none;
  font-weight: bold;
}
</style>