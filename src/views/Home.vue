<template>
  <div class="home-container">
    <NavBar v-if="isAuthenticated" />
    <div class="welcome-message">
      <h1>Welcome to the Moab Bike Hub, {{ userName }}!</h1>
      <p>We're excited to have you here.</p>
    </div>
    <CyclistQuiz v-if="showQuizModal" @close="closeQuizModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';
import CyclistQuiz from '../components/CyclistQuiz.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineComponent({
  name: 'Home',
  components: {
    NavBar,
    CyclistQuiz
  },
  setup() {
    const isAuthenticated = ref(false);
    const userName = ref('');
    const showQuizModal = ref(false); // Control the visibility of the quiz modal
    const auth = getAuth();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isAuthenticated.value = true;
          userName.value = user.displayName || 'User';
          // Check if the quiz has been completed
          // For now, we will set it to show for demonstration
          showQuizModal.value = true; // Set this based on your logic
        } else {
          isAuthenticated.value = false;
        }
      });
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