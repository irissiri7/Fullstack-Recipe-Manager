<template>
  <main>
    <Test message="Fullstack yay!"/>
  </main>
</template>

<script>
import Test from './components/Test.vue'

export default {
  name: 'App',
  components: {
    Test,
  },
  
}
</script>

<style>
*{
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
body, html, #app{
  height: 100vh;
  width: 100vw;
}
main{
  box-shadow: 0px 0px 21px -1px rgba(0,0,0,0.69);
  min-height: 100%;
  margin: 0 auto;
  width: 50%;
  -webkit-box-shadow: 0px 0px 21px -1px rgba(0,0,0,0.69); 

}
</style>
