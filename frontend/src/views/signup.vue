<!--Création de la page HTML signup-->
<template>
<div class="infoInscription">
                <h1>Inscription</h1>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" type="email" v-model="dataSignup.email">
                </div>
                <div>
                    <label for="username">Username:</label>
                    <input id="username" type="text" v-model="dataSignup.username">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="dataSignup.password">
                </div>
                <button @click.prevent="sendSignup" type="submit" id="validation"> S'inscire</button>
            </div>
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
            //vérification de l'email avec des conditions
            const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
            //vérification de l'username avec des conditions
            const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
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