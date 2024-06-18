<template>
  <div>
    <h1>User Profile</h1>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Bio: {{ user.bio }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';

export default {
  name: 'UserProfile',
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.dispatch('fetchUser', 'jane.doe@example.com');
  },
};
</script>