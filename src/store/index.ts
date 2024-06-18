import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchUser({ commit }, userEmail) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userEmail}`);
        const user = await response.json();
        commit('setUser', user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  },
});

export default store;