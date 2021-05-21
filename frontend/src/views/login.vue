<!--Création de la page HTML login-->
<template>
  <main class="main main--connect">
    <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
        <p>
          <small>
            Vous n'avez pas encore de compte,
            <router-link class="redirection-singup" to="/signup">enregistrez-vous</router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input type="text" class="form-control" id="inputEmail" v-model="dataLogin.email" />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataLogin.password"
          />
        </div>
        <button @click.prevent="login" type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </main>
</template>
<!--Scrpit à utiliser pour la page login-->
<script>
//importation de axios et vuex(map)
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: 'login', //nom du script 
    data(){ //fonction data
        return { //retourne dataLogin avec les valeurs d'email et password à null
            dataLogin:{ 
                email : null,
                password : null
            }
        };
    },
    computed:{
        ...mapState['user'] //utilisiation de la mapState user (store index.js)
    },
    methods: {//création des méthodes
        login(){ //fonction login
            if( //on vérifie si le email et password différent que null 
                this.dataLogin.email !== null ||
                this.dataLogin.password !== null
            ){
                axios //utilisation d'axios
                .post("http://localhost:3000/api/user/login",this.dataLogin) //on post avec dataLogin dans l'adresse
                .then(response => { //promesse de réponse
                    localStorage.setItem('token',response.data.token)//ont ajoute le token dans le localStorage
                    location.replace(location.origin) //ont remplace la location d'origin
                })
                .catch(error => console.log(error))//ont catch en cas d'erreur
            }else{
                window.alert("Merci de remplir tout les champs")
            }
        }
    }
}
</script>
<style lang='css'>
main{
    margin-top: 5rem;
}
@media screen and (max-width: 575px){
  .navbar-brand{
    max-width: 300px;
  }
} 
</style>