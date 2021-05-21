<!--Création de la page HTML wall-->
<template>
  <div id="wall" class="wall">
    <Forum v-for="forum in allForum" v-bind:key="forum.id" :forum="forum" />
  </div>
</template>

<!-- Scrpit pour le mur-->
<script>

//importation des plugins ou route qu'on à besoin
import axios from "axios";
import Forum from "../components/Forum";

export default {
  name: "Mur", //nom du script
  components: { //components qu'on va utilisé
    Forum
  },
  data() { //fonction
    return { //retourne message avec l'id content et image
      allForum: [] //tout les message dans un tableau
    };
  },
  mounted() {

    axios //utilisation d'axios
      .get("http://localhost:3000/api/forum", { //ont fait un get sur l'adresse
        headers: { // Conditions de headers 
          Authorization: "Bearer " + localStorage.getItem("token") // Authorisation avec bearer qu'on mais dans le local storage 
        }
      })
      .then(response => { //Ont attend une réponse 
        console.log("message", response.data); //ont console.log pour voir le résultats 
        this.allForum = response.data; // la response.data = à tout les messages
      })
      .catch(error => { // ont catch en cas d'erreur 
        console.log(error);
      }),
      this.$store.dispatch("getUserInfos");
  }
};
</script>

<style lang="scss">
.wall {
  margin-top: 2rem;
  background-color: white;
  min-height: 100%;
  padding: 5rem 0 2rem 0;
}
.block-post {
  background-color: white;
  width: 75%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  & h3 {
    color: grey;
    margin: 0.25rem 0;
    font-size: 0.75rem;
  }
  & .like-section {
    & div {
      display: inline-block;
      margin: 0 0.5rem;
      & i {
        margin: 0 0.2rem;
      }
      & a {
        text-decoration: none;
        color: grey;
      }
    }
    font-weight: 700;
    color: grey;
  }
}
</style>