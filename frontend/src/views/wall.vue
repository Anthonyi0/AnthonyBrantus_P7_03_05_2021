<!--Création de la page HTML wall-->
<template>
  <div id="wall" class="wall">
    <CreateMessage />
    <Message v-for="message in allMessages" v-bind:key="message.id" :message="message" @infosMessage="setInfos" />
    <modalBoxModerate :message="message" />
  </div>
</template>

<!-- Scrpit pour le mur-->
<script>

//importation des plugins ou route qu'on à besoin
import axios from "axios";
import CreateMessage from "../components/CreateMessage";
import Message from "../components/Message";
import modalBoxModerate from "../components/ModifMessage";

export default {
  name: "Mur", //nom du script
  components: { //components qu'on va utilisé 
    CreateMessage,
    Message,
    modalBoxModerate
  },
  data() { //fonction
    return { //retourne message avec l'id content et image 
      message: {
        id: "",
        content: "",
        image: ""
      },
      allMessage: [] //tout les message dans un tableau 
    };
  },
  methods: { //methodes qu'on va utilisé 
    setInfos(payload) { //fonction
      this.message = payload.message; 
    }
  },
  mounted() { //fonction
    axios //utilisation d'axios
      .get("http://localhost:3000/api/message", { //ont fait un get sur l'adresse 
        headers: { // Conditions de headers 
          Authorization: "Bearer " + localStorage.getItem("token") // Authorisation avec bearer qu'on mais dans le local storage 
        }
      })
      .then(response => { //Ont attend une réponse 
        console.log("message", response.data); //ont console.log pour voir le résultats 
        this.allMessages = response.data; // la response.data = à tout les messages 
      })
      .catch(error => { // ont catch en cas d'erreur 
        console.log(error);
      }),
      this.$store.dispatch("getUserInfos");
  }
};
</script>


<style lang="scss">
</style>
