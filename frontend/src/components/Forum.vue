<template>
  <div>
    <h4>{{ forum.name }}</h4>
    <router-link class="btn btn-primary btn-sm" :to="{ name: 'conversation_create', params: { id: forum.id }}" >
      Creer une conversation
    </router-link>
      <div class="row" v-for="conversation in forum.conversations" v-bind:key="conversation.id">

        <div class="col-3">
          <router-link :to="{ name: 'conversation', params: { id: conversation.id }}" >{{ conversation.title }}</router-link>
        </div>
        <div class="col-3">
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