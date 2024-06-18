<template>
  <div class="signup-container">
    <div class="signup-buttons">
      <button class="google-signup" @click="googleSignIn">Continue with Google</button>
      <button class="outlook-signup">Continue with Outlook</button>
    </div>
    <div class="divider">
      <span>OR</span>
    </div>
    <button class="email-signup" @click="goToEmailSignup">Sign up with email</button>
    <p class="already-account">
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';

export default defineComponent({
  setup() {
    const router = useRouter();

    const googleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        console.log('User signed in with Google:', user);
        router.push('/');  // Navigate to home after successful sign-in
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

    const goToEmailSignup = () => {
      router.push('/register');
    };

    return {
      googleSignIn,
      goToEmailSignup
    };
  }
});
</script>

<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signup-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.google-signup {
  background-color: #4285f4;
  color: white;
}

.outlook-signup {
  background-color: #0078d4;
  color: white;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
}

.divider span {
  flex-grow: 1;
  text-align: center;
  border-bottom: 1px solid #ccc;
  line-height: 0.1em;
  margin: 0 1rem;
  padding: 0 1rem;
  background: #f5f5f5;
}

.email-signup {
  background-color: #fff;
  color: #333;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.already-account {
  margin-top: 1rem;
}

.already-account a {
  color: #0078d4;
  text-decoration: none;
  font-weight: bold;
}
</style>