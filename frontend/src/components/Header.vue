<template>
  <nav class="row navbar navbar-expand-lg navbar-light bg-light fixed-top px-4">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarToggle"
      aria-controls="navbarToggle"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" to="/">
      <img class="w-50" src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" />
    </router-link>

    <div class="collapse navbar-collapse justify-content-end" id="navbarToggle">
      <ul class="navbar-nav mt-2 mt-lg-0">
        <li class="nav-item" v-if="user.token!==null">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="user.token==null">
          <router-link class="nav-link" to="/signup">SignUp</router-link>
        </li>
        <li class="nav-item" v-if="user.token==null">
          <router-link class="nav-link" to="/login">LogIn</router-link>
        </li>
        <li class="nav-item" v-if="user.token!==null">
          <router-link class="nav-link" to="/user">
            <i class="user-icon fas fa-user"></i>
          </router-link>
        </li>
        <li class="nav-item" v-if="user.token!==null">
          <button type="button" class="btn btn-danger" @click="disconnect">Disconnect</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex"; //utilisation de vuex
export default {
  computed: {
    ...mapState(["user"]) //utilisation du state user
  },
  methods: { 
    disconnect() { //fonction deconnection 
      localStorage.clear(); //clear localStorage pour enlevez le token 
      location.replace(location.origin); //change la location de place 
    }
  }
};
</script>

<style lang='scss'>
nav {
  position: fixed;
  top: 0;
  margin-bottom: 3rem;
}
</style>