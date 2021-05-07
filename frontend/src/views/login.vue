<!--Création de la page HTML login-->
<template>
<div class="infoConnection">
                <h1>Connection</h1>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" type="email" v-model="dataLogin.email">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="dataLogin.password">
                </div>
                <button @click.prevent="login" type="submit" id="validation"> Connection</button>
            </div>
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
<style lang="css">/*On déclare qu'on va utiliser du css*/
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