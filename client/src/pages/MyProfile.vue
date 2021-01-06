<template>
  <base-card>
    <div class="cnt">
      <div v-if="showChangeProfilePicture" class="field" id="file-upload-cnt">
        <input
          type="file"
          name="image"
          ref="file"
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
        :src="profilePictureSrc"
        ref="image"
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
    <component
      v-if="user"
      :is="activeComponent"
      :user="user"
      :profilePictureFile="profilePictureFile"
      :changedProfilePicture="changedProfilePicture"
    ></component>
  </base-card>
</template>

<script>
import axios from 'axios'

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
      activeComponent: 'user-details',
      user: null,
      profilePictureFile: null
    }
  },
  computed: {
    showChangeProfilePicture() {
      return this.activeComponent === 'user-details'
    },
    profilePictureSrc() {
      return this.user && this.user.profilePictureURL
        ? this.user.profilePictureURL
        : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    },
    changedProfilePicture() {
      return !!this.profilePictureFile
    }
  },
  methods: {
    async handleFileUpload() {
      const file = this.$refs.file.files[0]
      const image = this.$refs.image
      image.src = URL.createObjectURL(file)
      this.profilePictureFile = file
    },
    async fetchData() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_MY_URL}users/user/get-user-details/?firebaseId=${this.$store.getters.firebaseId}`,
          {
            headers: {
              Authorization: `Basic ${this.$store.getters.token}`
            }
          }
        )
        this.user = response.data
      } catch (error) {
        this.feedback.style = 'error'
        this.feedback.message = 'Could not fetch user information'
        console.log(error)
      }
    }
  },
  created() {
    this.fetchData()
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
  z-index: 2;
}
#image-btn {
  background-color: var(--main-orange);
  color: var(--main-pine);
}

#file-uploader {
  position: absolute;
  z-index: 3;
  opacity: 0;
}

.pencil.alternate.icon {
  color: white;
}
</style>
