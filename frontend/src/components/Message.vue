<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header d-flex justify-content-between">
      <div>Message by <em class="text-secondary">{{message.user.username}}</em> le <em class="text-secondary">{{message.createdAt.split(' ')[0]}}</em> à <em class="text-secondary">{{message.createdAt.split(' ')[1]}}</em></div>
      <div class="dropdown" v-if="user.is_admin==true || user.username == message.user.username">
        <svg
          class="bi bi-three-dots dropdown-toggle"
          id="dropdownMenuMessage"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
        </svg>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuMessage">
          <button
            class="dropdown-item modifMessage"
            data-toggle="modal"
            data-target="#modalEditMessage"
            type="button"
            @click="emitInfoMessage();changeEditStyle('modify');"
          >Modifier</button>
          <button
            class="dropdown-item deleteMessage"
            data-toggle="modal"
            data-target="#modalEditMessage"
            type="button"
            @click="emitInfoMessage();changeEditStyle('delete');"
          >Supprimer</button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-img-top w-75 mx-auto" v-if="message.attachement">
        <img :src="message.attachement" alt="..." class="w-100" />
      </div>
      <div class="card-text" v-if="message.content!=='null'">
        <p class="mb-0">{{message.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
//importation du state
import { mapState } from "vuex";
export default {
  name: "Message",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "editOption"]) //state user + editOption
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitInfoMessage() {
      this.$emit("infosMessage", { message: this.message });
    },
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    }
  }
};
</script>

<style>
</style>