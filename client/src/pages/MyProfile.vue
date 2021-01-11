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
          <img class="profile-pic" :src="profilePictureSrc" ref="image" />
          <!-- <img
            class="profile-pic"
            src="../assets/profileAvatar.png"
            ref="image"
          /> -->
        </div>
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
  </div>
</template>

<script>
import UserDetails from '../components/UserDetails.vue'
import ChangeEmail from '../components/ChangeEmail.vue'
import ChangePassword from '../components/ChangePassword.vue'
import CursiveHeader from '../components/CursiveHeader.vue'
import client from '../util/Client'

export default {
  components: {
    UserDetails,
    ChangeEmail,
    ChangePassword,
    CursiveHeader
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
        const user = await client.getUserDetails()
        this.user = user
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
