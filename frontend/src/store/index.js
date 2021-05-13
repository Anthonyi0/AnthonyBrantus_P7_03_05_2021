import Vue from 'vue' //Permet d'utiliser vue 
import Vuex from 'vuex' //Il sert de magasin centralisé pour tous les composants d'une application
import axios from 'axios' //Client HTTP basé sur la promesse pour le navigateur et node.js
// axios =  Elle permet de communiquer avec des API en utilisant des requêtes
Vue.use(Vuex) //ont utilise vuex

export default new Vuex.Store({
  state: { //création du state
    user: { //state user : 
      username: 'Nc',
      userId: 'Nc',
      email: 'Nc',
      token: null,
      is_admin: false
    },
    editOption: ""
  },
  mutations: {//création de la mutations
    saveUserInfos(state, [username, userId, email, is_admin]) { //on prend avec le state 
        state.user.username = username,// on fait muté username 
          state.user.userId = userId,// on fait muté userId 
          state.user.email = email,// on fait muté l'email 
          state.user.token = localStorage.getItem('token'),//on fait muté le token 
          state.user.is_admin = is_admin////on fait muté is_admin 
    },
    editStyle(state, value) {//on édite state + avec la value
      state.editOption = value
    }
  },
  actions: {
    getUserInfos(context) {
      axios // utilisation axios
        .get("http://localhost:3000/api/user/me", { //ont cherche l'adresse avec get
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token")//ont veux un header avec authorization
          }
        })
        .get("http://localhost:3000/api/message",this.$store.state.headerParams) //ont cherche l'adresse avec get et les headerParms
        .then(response => {
          console.log('réponse API',response);
          context.commit('saveUserInfos',[response.data.username, response.data.id, response.data.email, response.data.is_admin])
        })
        .catch(error => {
          console.log('Erreur auth', error); //affiche pas le message 'normalement' envoyé par le back
        });
    },
    changeEditStyle(context, value){
      context.commit('editStyle',value)
    }
  },
})