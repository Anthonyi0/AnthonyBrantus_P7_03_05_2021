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
            if (this.dataSignup.password === null){
                alert("Pour un password valide : Une majuscule Une minuscule Un caractère spéciaux et Plus de 8 carractères")
            }
            //vérification de l'email avec des conditions
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            if(this.dataSignup.email === null){
                alert("merci de mettre un email valide")
            }
            //vérification de l'username avec des conditions
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
            if(this.dataSignup.username === null){
                alert('Merci de mettre un username')
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
button{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 180px;
    margin: auto 0;
    border-radius: 50px 50px;
    font-size: 1.2em;
    color: white;
    font-weight: bold;
    background-image: linear-gradient(rgb(255 43 90 / 90%),rgb(62 43 84 / 90%));
    box-shadow: 0 6px 8px -7px black;
    border: none;
}
#inscription{
    margin-top: 1rem;
}
button:hover,button:active{
	box-shadow: 0 8px 12px -7px black;
	transition: 0.5s;
}
button:focus{
	outline: 0;
}
section{
    padding-top: 2rem;
}
.infoConnection,.infoInscription{
    height: 500px;
    max-width: 70%;
    margin: auto;
    padding: 3rem 0 0 0;
}
h1{
    font-size: 2rem;
    text-align: center;
}
label{
    display: block;
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 1rem;
    text-align: start;
}
input{
    width: 75%;
    height: 20px;
    margin: 1rem 0;
    border: 1px solid black;
    border-radius: 0.25rem;
    font-size: 1.2rem;
}
input:focus{
    color: #495057;
    background-color: #fff;
    border: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%)
}
#validation{
    margin: 3rem auto;
    height: 40px;
    width: 180px;
}
@media screen and (max-width: 900px){
    button{
        height: 25px;
        width: 100px;
        font-size: 1rem;
    }  
}
@media screen and (max-width: 800px){
    img{
        max-width: 20rem;
        max-height: 20rem;
    }
}
@media screen and (max-width: 500px){
    img{
        max-width: 10rem;
        max-height: 10rem;
    }
}
</style>