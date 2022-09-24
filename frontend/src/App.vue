<template>
  <div id="app" class="bg-f8f8f8">
    <div class="container mx-auto shadow-lg p-3 bg-white"><Home /></div>
  </div>
</template>

<script>
import Home from "./Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app > img {
  width: 155px;
}
</style>
