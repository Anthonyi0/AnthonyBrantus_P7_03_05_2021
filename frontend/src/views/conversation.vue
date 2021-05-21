<!--Création de la page HTML wall-->
<template>
  <div id="wall" class="wall">
    <h1>
      {{conversation.title }}
    </h1>
    <CreateMessage :conversation="conversation" />
    <Message v-for="message in allMessages" v-bind:key="message.id" :message="message" @infosMessage="setInfos" />
    <modalBoxModerate :message="message" />

    <a href="#" @click.prevent="removeConversation" >Delete this conversation</a>
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
        attachment: ""
      },
      allMessages: [], //tout les message dans un tableau
      conversation: {}
    };
  },
  methods: { //methodes qu'on va utilisé 
    setInfos(payload) { //fonction
      this.message = payload.message; 
    },
    removeConversation() {
      axios.delete("http://localhost:3000/api/conversations/"+this.conversation.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token") // Authorisation avec bearer qu'on mais dans le local storage
        }
      }).then(() => {
        this.$router.push({ name: 'wall' });
      })
          .catch(error => {
            console.log(error);
          })
    }
  },
  mounted() { //fonction
    axios //utilisation d'axios
      .get("http://localhost:3000/api/conversations/"+this.$route.params.id, { //ont fait un get sur l'adresse
        validateStatus: false,
        headers: { // Conditions de headers
          Authorization: "Bearer " + localStorage.getItem("token") // Authorisation avec bearer qu'on mais dans le local storage 
        }
      })
      .then(response => { //Ont attend une réponse
        if (404 === response.status) {
          this.$router.push({ name: 'wall' });
        }

        this.allMessages = response.data.messages; // la response.data = à tout les messages
        this.conversation = response.data; // la response.data = à tout les messages
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