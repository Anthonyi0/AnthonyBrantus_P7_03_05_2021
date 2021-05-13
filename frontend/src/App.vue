<template>
  <div id="app" class="container-fluid">
    <Header /> <!--utilisation du header qui est dans components-->
      <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
</style>
