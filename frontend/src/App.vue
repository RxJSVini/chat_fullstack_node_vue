<template>
  <div id="app">
    <NavbarPublic />
    <div id="nav"></div>
    <Footer />
    <router-view />
  </div>
</template>

<script>
import NavbarPublic from "./components/NavbarPublic.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "Home",
  components: {
    NavbarPublic,
    Footer,
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
