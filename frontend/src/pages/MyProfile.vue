<template>
  <div>
    <cursive-header>My Profile</cursive-header>
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
        <div class="img-cnt">
          <img
            class="profile-pic"
            :src="profilePictureSrc"
            ref="image"
            alt="profile picture"
          />
        </div>
      </div>
      <div class="flex navigation-cnt">
        <button
          @click="currentComponent = 'user-details'"
          class="nav-btn"
          :class="{ selected: currentComponent === 'user-details' }"
        >
          General info
        </button>
        <button
          @click="currentComponent = 'change-email'"
          class="nav-btn"
          :class="{ selected: currentComponent === 'change-email' }"
        >
          Change email
        </button>
        <button
          @click="currentComponent = 'change-password'"
          class="nav-btn"
          :class="{ selected: currentComponent === 'change-password' }"
        >
          Change password
        </button>
      </div>
      <component
        v-if="user"
        :is="currentComponent"
        :currentProps="currentProps"
        @user-updated="onUserUpdate"
      ></component>
    </base-card>
  </div>
</template>

<script>
import UserDetails from '../components/UserDetails.vue'
import ChangeEmail from '../components/ChangeEmail.vue'
import ChangePassword from '../components/ChangePassword.vue'
import CursiveHeader from '../components/CursiveHeader.vue'
import client from '../util/Client'
import feedback from '../mixins/feedback.js'

export default {
  components: {
    UserDetails,
    ChangeEmail,
    ChangePassword,
    CursiveHeader
  },
  mixins: [feedback],
  data() {
    return {
      currentComponent: 'user-details',
      user: null,
      profilePictureFile: null
    }
  },
  computed: {
    currentProps() {
      if (this.currentComponent === 'user-details') {
        return {
          user: this.user,
          profilePictureFile: this.profilePictureFile,
          changedProfilePicture: this.changedProfilePicture
        }
      } else {
        return null
      }
    },
    showChangeProfilePicture() {
      return this.currentComponent === 'user-details'
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
  created() {
    this.fetchData()
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
        const user = await client.getUserDetails()
        this.user = user
      } catch (error) {
        this.displayFeedback('Could not fetch user information', 'error')
        console.log(error)
      }
    },
    onUserUpdate() {
      this.fetchData()
      this.profilePictureFile = null
    }
  }
}
</script>

<style scoped>
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
  cursor: pointer;
  width: 100%;
  height: 100%;
  font-size: 0;
}

.pencil.alternate.icon {
  color: white;
}

.img-cnt {
  width: 130px;
  height: 130px;
  display: inline-block;
}

.profile-pic {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid white;
}
</style>
