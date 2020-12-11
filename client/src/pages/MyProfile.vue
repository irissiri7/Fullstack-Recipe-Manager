<template>
  <base-card>
    <div class="cnt">
      <div v-if="showChangeProfilePicture" class="field" id="file-upload-cnt">
        <input
          type="file"
          name="image"
          ref="image"
          id="file-uploader"
          @change="handleFileUpload"
        />
        <button
          class="ui icon circular button"
          id="image-btn"
          @click.prevent=""
        >
          <i class="pencil alternate icon"></i>
        </button>
      </div>
      <img
        class="ui middle aligned small circular bordered image"
        src="../assets/profilepicture.jpeg"
      />
      <h1>My Profile</h1>
    </div>
    <div class="flex navigation-cnt">
      <button
        @click="activeComponent = 'user-details'"
        class="nav-btn"
        :class="{ selected: activeComponent === 'user-details' }"
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
import UserDetails from '../components/UserDetails.vue'
import ChangeEmail from '../components/ChangeEmail.vue'
import ChangePassword from '../components/ChangePassword.vue'

export default {
  components: {
    UserDetails,
    ChangeEmail,
    ChangePassword
  },
  data() {
    return {
      activeComponent: 'user-details'
    }
  },
  computed: {
    showChangeProfilePicture() {
      return this.activeComponent === 'user-details'
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

.cnt {
  margin-bottom: 2rem;
}
.navigation-cnt {
  margin: 10px 0px;
}
.nav-btn {
  padding: 5px 15px 5px 0px;
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

/* Css for overriding the default file uploader, its just too damn ugly */
#file-upload-cnt {
  position: absolute;
  z-index: 98;
}
#image-btn {
  background-color: var(--main-orange);
  color: var(--main-pine);
}

#file-uploader {
  position: absolute;
  z-index: 99;
  opacity: 0;
}

.pencil.alternate.icon {
  color: white;
}
</style>
