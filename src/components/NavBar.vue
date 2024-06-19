<template>
  <nav>
    <ul>
      <li><router-link to="/home">Home</router-link></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };

    return {
      logout
    };
  }
});
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  /* background-color: #333; */
  color: white;
  padding: 1rem;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 1rem;
}

li {
  display: flex;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>