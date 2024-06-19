<template>
  <div class="home-container">
    <NavBar v-if="isAuthenticated" />
    <div class="welcome-message">
      <h1>Welcome to the Moab Bike Hub, {{ userName }}!</h1>
      <p>We're excited to have you here.</p>
    </div>
    <CyclistQuiz v-if="showQuizModal" :show="showQuizModal" @close="closeQuizModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import CyclistQuiz from '../components/CyclistQuiz.vue';

export default defineComponent({
  name: 'Home',
  components: {
    NavBar,
    CyclistQuiz
  },
  setup() {
    const isAuthenticated = ref(false);
    const userName = ref('');
    const showQuizModal = ref(false);

    onMounted(() => {
      console.log('Home component mounted');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      isAuthenticated.value = !!localStorage.getItem('token');
      userName.value = user.displayName || user.email || 'User';
      showQuizModal.value = !user.quizCompleted; // Adjust based on your logic
    });

    const closeQuizModal = () => {
      showQuizModal.value = false;
    };

    return {
      isAuthenticated,
      userName,
      showQuizModal,
      closeQuizModal
    };
  }
});
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.welcome-message {
  text-align: center;
}
</style>