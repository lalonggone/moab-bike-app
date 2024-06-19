<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <button @click="closeModal">Close</button>
        <h1>Let's get to know you better!</h1>
        <form @submit.prevent="submitQuiz">
          <div v-if="step === 1" class="quiz-step">
            <p>What type of cyclist are you?</p>
            <label><input type="radio" v-model="type" value="beginner" /> Beginner</label>
            <label><input type="radio" v-model="type" value="intermediate" /> Intermediate</label>
            <label><input type="radio" v-model="type" value="advanced" /> Advanced</label>
            <button type="button" @click="nextStep">Next</button>
          </div>
          <div v-if="step === 2" class="quiz-step">
            <p>What are you looking to get out of this app?</p>
            <label><input type="checkbox" v-model="goals" value="find riding partners" /> Find riding partners</label>
            <label><input type="checkbox" v-model="goals" value="join events" /> Join events</label>
            <label><input type="checkbox" v-model="goals" value="buy/sell equipment" /> Buy/sell equipment</label>
            <label><input type="checkbox" v-model="goals" value="improve skills" /> Improve skills</label>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { getAuth } from 'firebase/auth';
  
  export default defineComponent({
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    setup(props, { emit }) {
      const step = ref(1);
      const type = ref('');
      const goals = ref([]);
      const auth = getAuth();

      const closeModal = () => {
        emit('close');
      };
  
      const nextStep = () => {
        step.value++;
      };
  
      const submitQuiz = async () => {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not logged in');
          return;
        }
        try {
          const response = await axios.post('http://localhost:3000/user-profile', {
            userId: user.uid,
            type: type.value,
            goals: goals.value
          });
          console.log('Quiz submitted:', response.data);
          emit('close'); // Close the modal after submission
        } catch (error) {
          console.error('Error submitting quiz:', error);
        }
      };
  
      return {
        step,
        type,
        goals,
        nextStep,
        submitQuiz,
        closeModal
      };
    }
  });
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .quiz-step {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    margin-top: 1rem;
  }
  </style>