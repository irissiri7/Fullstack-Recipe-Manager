import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuth: false,
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    logIn(state) {
      state.isAuth = true;
    },
  },
  actions: {
    logIn(context) {
      context.commit("logIn");
    },
  },
  getters: {
    isAuth(state) {
      return state.isAuth;
    },
  },
});

export default store;
