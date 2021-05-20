<!--Création de la page HTML signup-->
<template>
  <main class="main main--connect">
    <form class="w-75 align-items-center form-block d-flex m-auto shadow rounded">
      <div
        class="form-block--left d-flex flex-column justify-content-center block-demi-container p-3 text-right align-self-stretch"
      >
        <img class="logo align-self-end" src="../assets/icon.svg" alt="Logo Groupomania" />
        <p>
          <small>
            Vous avez déjà un compte,
            <router-link class="redirection-singup" to="/login">connecter-vous</router-link>
          </small>
        </p>
      </div>
      <div class="block-demi-container p-3">
        <div class="form-group">
          <label for="inputEmail">Email Groupomania</label>
          <input type="email" class="form-control" id="inputEmail" v-model="dataSignup.email" />
        </div>
        <div class="form-group">
          <label for="inputUsername">Username</label>
          <input type="text" class="form-control" id="inputUsername" v-model="dataSignup.username" />
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataSignup.password"
          />
        </div>
        <button @click.prevent="sendSignup" type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </main>
</template>
<!--Scrpit à utiliser pour la page signup-->
<script>
//importation de axios et vuex(map)
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: "signup", //nom du script 
    data(){// fonction data
        return { //retourne dataSignup avec les valeurs d'username,email et password à null
            dataSignup:{ 
                username : null,
                email: null,
                password : null
            }
        };
    },
    computed:{
        ...mapState['user'] //utilisiation de la mapState user (store index.js)
    },
    methods: {//création des méthodes
        sendSignup(){//fonction qu'on va utiliser
            //vérification du password avec des conditions
            const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/
            if (regexPassword.test(this.dataSignup.password) === false){
                alert("Pour un password valide : Une majuscule Une minuscule Un caractère spéciaux et Plus de 8 carractères")
            }
            //vérification de l'email avec des conditions
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            if(regexEmail.test(this.dataSignup.email) === false){
                alert("merci de mettre un email valide")
            }
            //vérification de l'username avec des conditions
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{5,29}$/;
            if(usernameRegex.test(this.dataSignup.username) === false){
                alert('Merci de mettre un username valide (Entre 5 et 29 caractères et sans caractère spéciaux)')
            }
            if ( //si aucun n'est null
                (this.dataSignup.email !== null || 
                this.dataSignup.username !== null ||
                this.dataSignup.password !== null) &&
                (regexPassword.test(this.dataSignup.password) && regexEmail.test(this.dataSignup.email) && usernameRegex.test(this.dataSignup.username))
            ) {
                axios //utilisation d'axios
                .post('http://localhost:3000/api/user/signup',this.dataSignup)//on post avec dataSignup dans l'adresse
                .then(response =>{//promesse de response
                    console.log(response)
                    //on réinitialise les 3 valeurs 
                    this.dataSignup.email = null;
                    this.dataSignup.username = null;
                    this.dataSignup.password = null 
                    alert('Inscription réussit')
                    location.replace(location.origin+'/#/login')
                })
                .catch(error => console.log(error))//ont catch en cas de problème
            }else{
                alert('un soucis est survenue pendant la saisies')
            }
        }
    }      
}
</script>
<style lang='css'>
main{
    margin-top: 5rem;
}
</style>