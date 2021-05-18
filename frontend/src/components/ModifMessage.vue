<template>
  <div
    class="modal fade"
    id="modalEditMessage"
    tabindex="-1"
    role="dialog"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <!--Modification est demandée-->
      <div class="modal-content" v-if="editOption=='modify'">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Modifier le message</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data" action="/update" method="put">
            <div class="input-group mb-3">
              <label for="input_text">Modifiez votre texte</label>
              <br />
              <textarea class="input-text" id="inputNewText" type="text" :value="message.content"></textarea>
            </div>
            <div class="input-group mb-3" v-if="message.attachement">
              <br />
              <img class="img-thumbnail" :src="message.attachement" />
              <button type="button" class="btn btn-danger mx-auto mt-1" @click='deleteImgAction'>Delete image</button>
            </div>

            <span id="msgReturnAPI" class="mx-3"></span>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-primary" @click="updateMessage">Save changes</button>
        </div>
      </div>

      <!--Une suppression est demandée-->
      <div class="modal-content" v-else>
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Supprimer ce message (id: {{message.id}})</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Etes vous sûr de vouloir supprimer ce message</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="deleteMessage">Delete message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//importation axios + state
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "modalBoxModerate",
  data() {
    return {
      deleteImg: false
    };
  },
  computed: {
    ...mapState(["user", "editOption"]) //state user +editOption
  },
  props: {
    message: {
      type: Object,
      default() {}
    }
  },
  methods: {
    deleteMessage() { //fonction suppression message 
      axios //utilisation axios
        .delete("http://localhost:3000/api/message/delete", { //utilisation de delete + adresse
          headers: { //header pour avoir l'autorisation 
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: { //récupération de l'id du message + userId
            messageId: this.message.id,
            userIdOrder: this.user.userId
          }
        })
        .then(() => { //promise 
          window.location.reload(); //refresh 
        })
        .catch(error => console.log(error)); //catch erreur 
    },
    updateMessage() { //fonction mise à jour du message 
      let newInput = document.getElementById("inputNewText").value; //on prend la valeur du input
      //Verification si changements existent
      let newContent = false;
      if (newInput !== this.message.content || this.deleteImg != false) {
        newContent = true;
      }
      //Modificiation si changements existent
      if (newContent && this.deleteImg) {
        axios//utilisation axios
          .put("http://localhost:3000/api/message/update",{ //utilisation de put avec l'adresse
              messageId: this.message.id,
              userIdOrder: this.user.userId,
              newText: newInput,
              newImg: null
            },
            {
              headers: { //utilisation de headers pour avoir autorisation
                authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          .then(response => { //promise avec reponse 
            console.log("reponse API", response); //log pour vérif 
            this.retourAPI = response.data.confirmation;
            setTimeout(() => {
              this.retourAPI = "";
              window.location.reload();
            },);
          })
          .catch(error => { //catch en cas d'erreur 
            console.log("admin", error);
            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
          })
      } else if(newContent){
        axios //utilisation axios 
          .put("http://localhost:3000/api/message/update",{ //utilisation du put avec adresse 
              messageId: this.message.id,
              userIdOrder: this.user.userId,
              newText: newInput,
            },
            {
              headers: { //header pour autorisation 
                authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          .then(response => { //promise avec reponse 
            console.log("reponse API", response); //log pour vérif 
            this.retourAPI = response.data.confirmation;
            setTimeout(() => {
              this.retourAPI = "";
              window.location.reload();
            },);
          })
          .catch(error => { //catch en cas d'erreur 
            console.log("admin", error);
            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
          })
        } else{
            console.log("aucun changement");
        }
    },
    deleteImgAction() { //fonction delete image 
      this.deleteImg = true;
    }
  }
};
</script>

<style>
</style>