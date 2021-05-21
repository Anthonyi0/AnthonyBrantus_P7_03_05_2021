<template>
  <div style="margin-top: 100px">

    <div class="form-group">
      <label for="title">Titre</label>
      <input v-model="conversation.title" id="title" type="text" class="form-control" />
    </div>

    <div class="form-group">
      <textarea v-model="conversation.message" class="form-control" ></textarea>
    </div>

    <div class="form-group">
      <input type="submit" class="btn btn-primary" @click.prevent="createConversation" />
    </div>
  </div>
</template>

<script>
    import axios from "axios";

    export default {
      data() { //fonction data
        return { // retourne le contenu du message + image
          conversation: {
            title: '',
            message: ''
          },
          forum: {},
          msgError: ""
        };
      },
      mounted() {
        axios
            .get("http://localhost:3000/api/forum/"+this.$route.params.id, { //ont fait un get sur l'adresse
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token") // Authorisation avec bearer qu'on mais dans le local storage
              }
            }).then(response => {
              this.forum = response.data
            })
      },
      methods: {
        createConversation() {
          axios.post("http://localhost:3000/api/conversations", {
            title: this.conversation.title,
            forum_id: this.forum.id,
            content: this.conversation.message
          }, { //ont utilise post avec l'adress + la nouvelle formData
            headers: { //utilisation du header pour l'autorisation
              Authorization: "Bearer " + window.localStorage.getItem("token")
            }
          })
              .then(response => { //promis avec réponse
                //Si retour positif de l'API reload de la page pour affichage du dernier message
                if (response) {
                  window.location = '/#/conversation/' + response.data.id
                }
              })
              .catch(error => (this.msgError = error)); //catch en cas d'erreur
        }
      }
   }
</script>