<template>
 <div>
    <div class="block-message">
      <h3>Créer un message</h3>
      <form enctype="multipart/form-data" action="/create" method="message">
        <div class="input-group mb-3">
          <label for="input_text">Racontez nous votre histoire:</label>
          <br />
          <input v-model="contentMessage.content" class="input-text" id="input_text" type="text" />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputFileAddon">Upload</span>
          </div>
          <div class="custom-file">
            <input
              name="inputFile"
              type="file"
              class="custom-file-input"
              id="inputFile"
              aria-describedby="inputFileAddon"
              @change="onFileChange"
            />
            <label class="custom-file-label" for="inputFile">Choose file</label>
          </div>
        </div>
        <input type="submit" class="btn btn-primary" @click.prevent="createMessage" value="Submit" />
        <span id='msgReturnAPI' class="mx-3 text-danger" v-if="user.token==null">Veuillez vous connecter</span>
        <span id='msgReturnAPI' class="mx-3" v-else>{{msgError}}</span>
      </form>
    </div>
  </div>
</template>

<script>
//importation axios + state
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreateMessage",
  data() { //fonction data 
    return { // retourne le contenu du message + image
      contentMessage: {
        content: null,
        messageImage: null
      },
      msgError: ""
    };
  },
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["user", "editOption"]) // utilisation du state user et editOption
  },
  methods: {
    createMessage() { //fonction creation de message

      const formData = new FormData(); //Création du nouveau formdata
      formData.append("inputFile", this.contentMessage.messageImage); //image
      formData.append("content", this.contentMessage.content); //contenu 
      formData.append("conversation", this.conversation.id); //contenu

      console.log("test récup image :", formData.get("inputFile")); //ont test le inputFile
      console.log("test récup message :", formData.get("content")); //ont test le content 
      if (formData.get("inputFile") == "null" && formData.get("content") == "null") { //si tout est null rien à publier 
        let msgReturn = document.getElementById('msgReturnAPI')
        msgReturn.classList.add('text-danger')
        this.msgError = "Rien à publier";
      } else {
        axios.post("http://localhost:3000/api/message/create", formData, { //ont utilise post avec l'adress + la nouvelle formData 
            headers: { //utilisation du header pour l'autorisation 
              Authorization: "Bearer " + window.localStorage.getItem("token")
            }
          })
          .then(response => { //promis avec réponse 
            //Si retour positif de l'API reload de la page pour affichage du dernier message
            if (response) {
              window.location.reload();
            }
          })
          .catch(error => (this.msgError = error)); //catch en cas d'erreur 
      }
    },
    onFileChange(e) {
      console.log(e);
      this.contentMessage.messageImage = e.target.files[0] || e.dataTransfer.files;
      console.log(this.contentMessage.messageImage);
    }
  }
};
</script>

<style>
.input-text {
  width: 100%;
}
</style>