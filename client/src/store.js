import { createStore } from "vuex";
import router from "./router.js";
import apiKey from "./assets/api-key";

const store = createStore({
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      router.push("/home");
    },
  },
  actions: {
    async logIn(context, payload) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate"
        );
        throw error;
      }

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.tokenExpiration,
      });
    },
  },
  getters: {
    isAuth(state) {
      return !!state.token;
    },
  },
});

export default store;
