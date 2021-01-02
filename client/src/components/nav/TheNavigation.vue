<template>
  <header>
    <div>
      <div class="flex center">
        <h2 class="ui header" @click.prevent="backToHome">
          <i class="lemon outline icon"></i>
          <div class="content">
            Recipe Manager
          </div>
        </h2>
        <nav v-if="$store.getters.isAuth">
          <div id="full-menu">
            <full-menu></full-menu>
          </div>
          <div id="compact-menu">
            <compact-menu></compact-menu>
          </div>
        </nav>
      </div>
    </div>
    <div v-if="$store.getters.isAuth" id="sign-out-icon">
      <button class="ui icon button" @click="signOut">
        <i class="sign out alternate icon large"></i>
      </button>
    </div>
  </header>
</template>

<script>
import CompactMenu from './CompactMenu.vue'
import FullMenu from './FullMenu.vue'

export default {
  components: {
    CompactMenu,
    FullMenu
  },
  methods: {
    backToHome() {
      if (this.$store.getters.isAuth) this.$router.push('/home')
      else this.$router.push('/')
    },
    signOut() {
      this.$store.dispatch('signOut')
      this.$router.push('/')
    }
  }
}
</script>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: var(--main-orange);
  padding: 1.5rem;
}
.ui.header {
  color: var(--main-coffee);
  cursor: pointer;
}
.content {
  font-family: Rochester, sans-serif;
  font-size: 50px;
}

nav {
  margin-left: 1em;
  height: 100%;
}

.nav-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.nav-list a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: var(--main-coffee);
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

.nav-list a:hover,
.nav-list a:active,
.nav-list a.active {
  color: #30292f;
  border-color: #30292f;
  background-color: #eeb63d;
  border-radius: 10px;
}

@media screen and (max-width: 768px) {
  #full-menu {
    display: none;
  }
  #compact-menu {
    display: block;
  }
  #sign-out-icon {
    display: none;
  }
  .flex.center {
    display: block;
  }
  .nav-list a {
    padding-left: 0px;
    border: none;
  }
  .nav-list a:hover,
  .nav-list a:active,
  .nav-list a.active {
    border: none;
    border-radius: 0px;
  }
}
@media screen and (min-width: 768px) {
  #full-menu {
    display: block;
  }
  #compact-menu {
    display: none;
  }
}
</style>
