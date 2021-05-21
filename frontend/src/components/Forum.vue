<template>
  <div class="forum">
    <h4>{{ forum.name }}</h4>
    <router-link class="btn btn-primary btn-sm" :to="{ name: 'conversation_create', params: { id: forum.id }}" >
      Creer une conversation
    </router-link>
      <div class="row" v-for="conversation in forum.conversations" v-bind:key="conversation.id">

        <div class="col-4 md-2 mt-2">
          <router-link :to="{ name: 'conversation', params: { id: conversation.id }}" >{{ conversation.title }}</router-link>
        </div>
        <div class="col-3">
          <label>Par :</label>
          {{ conversation.user.username }}
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    "name": "Forum",
    components: {},
    data() {
      return {};
    },
    props: {
      forum: {
        type: Object,
        required: true
      }
    }
  }
</script>
<style>
.forum{
    flex-wrap: wrap;
    display: inline-block;
    margin: 0 10px 75px 10px;
  
}
@media screen and (max-width: 575px){
  .navbar-brand{
    max-width: 300px;
  }
} 
</style>