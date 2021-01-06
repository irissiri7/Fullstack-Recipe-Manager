<template>
  <header>
    <div id="full-menu">
      <full-menu @sign-out="signOut" @back-to-home="backToHome"></full-menu>
    </div>
    <div id="compact-menu">
      <compact-menu
        @sign-out="signOut"
        @back-to-home="backToHome"
      ></compact-menu>
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
  background-color: var(--main-orange);
  padding: 1rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  #full-menu {
    display: none;
  }
  #compact-menu {
    display: block;
  }
}
@media screen and (min-width: 768px) {
  #full-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #compact-menu {
    display: none;
  }
}
</style>
