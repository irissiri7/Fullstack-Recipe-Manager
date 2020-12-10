<template>
  <base-card>
    <div class="cnt">
      <img
        class="ui middle aligned small circular bordered image"
        src="../assets/profilepicture.jpeg"
      />
      <h1>My Profile</h1>
    </div>
    <div class="flex navigation-cnt">
      <button
        @click="activeComponent = 'general-profile-info'"
        class="nav-btn"
        :class="{ selected: activeComponent === 'general-profile-info' }"
      >
        General info
      </button>
      <button
        @click="activeComponent = 'change-email'"
        class="nav-btn"
        :class="{ selected: activeComponent === 'change-email' }"
      >
        Change email
      </button>
      <button
        @click="activeComponent = 'change-password'"
        class="nav-btn"
        :class="{ selected: activeComponent === 'change-password' }"
      >
        Change password
      </button>
    </div>
    <component :is="activeComponent"></component>
  </base-card>
</template>

<script>
import GeneralProfileInfo from '../components/GeneralProfileInfo.vue'
import ChangeEmail from '../components/ChangeEmail.vue'
import ChangePassword from '../components/ChangePassword.vue'

export default {
  components: {
    GeneralProfileInfo,
    ChangeEmail,
    ChangePassword
  },
  data() {
    return {
      activeComponent: 'general-profile-info'
      // activeComponent: 'change-email'
    }
  }
}
</script>

<style scoped>
h1 {
  display: inline;
  margin-left: 2rem;
  color: #30292f;
}
.full-width {
  width: 100%;
}
.cnt {
  margin-bottom: 2rem;
}
.navigation-cnt {
  margin: 10px 0px;
}
.nav-btn {
  padding: 5px 10px 5px 0px;
  border: none;
  background: none;
  font-family: inherit;
  border-bottom: 1px solid grey;
}

.nav-btn:focus,
.nav-btn:active {
  outline: none;
}

.nav-btn:hover {
  color: var(--main-orange);
  border-bottom: 1px solid var(--main-orange);
}

.selected {
  color: var(--main-orange);
  border-bottom: 1px solid var(--main-orange);
}
</style>
