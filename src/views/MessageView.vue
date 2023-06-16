<template>
  <HeaderVue />
  <div class="page-content">
    <div class="chat-wrapper d-lg-flex gap-1 mt-n5 p-1 overflow-hidden">
      <ProgressTiket :autono="autono" v-on:show-class="updateClass" />
      <div
        :class="
          !showChat
            ? falseChat
            : 'user-chat w-100 overflow-hidden user-chat-show'
        "
      >
        <div class="chat-content d-lg-flex">
          <!-- start chat conversation section -->
          <div class="w-100 overflow-hidden">
            <!-- conversation user -->
            <div class="position-relative">
              <div class="p-3 user-chat-topbar">
                <div class="row align-items-center">
                  <div class="col-sm-12 col-8">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0 d-block d-lg-none me-3">
                        <a
                          href="javascript: void(0);"
                          class="user-chat-remove fs-18 p-1"
                          @click.prevent="removeClass"
                          ><i class="ri-arrow-left-s-line align-bottom"></i
                        ></a>
                      </div>
                      <div class="flex-grow-1 overflow-hidden">
                        <div v-if="level_name === 'ADMINISTRATOR'">
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1 overflow-hidden">
                              <h5 class="text-truncate mb-0 fs-16">
                                <a
                                  class="text-reset username"
                                  data-bs-toggle="offcanvas"
                                  aria-controls="userProfileCanvasExample"
                                  >Histori Chat</a
                                >
                              </h5>
                              <p
                                class="text-truncate text-muted fs-14 mb-0 userStatus"
                              ></p>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex align-items-center" v-else>
                          <div
                            class="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0"
                          >
                            <img
                              src="@/assets/usr.png"
                              class="rounded-circle avatar-xs"
                              alt=""
                            />
                            <span class="user-status"></span>
                          </div>
                          <div class="flex-grow-1 overflow-hidden">
                            <h5 class="text-truncate mb-0 fs-16">
                              <a
                                class="text-reset username"
                                data-bs-toggle="offcanvas"
                                aria-controls="userProfileCanvasExample"
                                >CS VTADESK</a
                              >
                            </h5>
                            <span
                              class="badge bg-warning"
                              v-show="status == 'closed'"
                              >Tiket sudah ditutup, chat tidak bisa
                              digunakan</span
                            >
                            <p
                              class="text-truncate text-muted fs-14 mb-0 userStatus"
                            ></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end chat user head -->

              <div class="position-relative" id="users-chat">
                <div
                  class="chat-conversation p-3 p-lg-4"
                  id="chat-conversation"
                  data-simplebar
                >
                  <ul
                    class="list-unstyled chat-conversation-list"
                    id="users-conversation"
                    v-for="message in state.messages"
                    :key="message.key"
                  >
                    <li
                      class="chat-list right"
                      v-if="message.username == namaLocalStorage"
                    >
                      <div class="conversation-list">
                        <div class="user-chat-content">
                          <div class="ctext-wrap">
                            <div class="ctext-wrap-content">
                              <small
                                class="text-muted"
                                style="font-size: smaller"
                                >{{ getDate(message.date) }}</small
                              >
                              <p class="mb-0 ctext-content text-dark">
                                {{ message.content }}
                              </p>
                            </div>
                          </div>
                          <div class="conversation-name">
                            <small class="text-muted time">{{
                              getTime(message.date)
                            }}</small>
                            <span class="text-success check-message-icon"
                              ><i class="ri-check-double-line align-bottom"></i
                            ></span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <!-- chat-list -->
                    <li class="chat-list left" v-else>
                      <div class="conversation-list">
                        <div class="user-chat-content">
                          <div class="ctext-wrap">
                            <div class="ctext-wrap-content">
                              <strong v-show="level_name === 'ADMINISTRATOR'"
                                >{{ message.username }} -
                              </strong>
                              <small
                                class="text-muted"
                                style="font-size: smaller"
                                >{{ getDate(message.date) }}
                              </small>
                              <p class="mb-0 ctext-content">
                                {{ message.content }}
                              </p>
                              <small class="text-muted time float-end">{{
                                getTime(message.date)
                              }}</small>
                            </div>
                          </div>
                          <div class="conversation-name">
                            <span class="text-success check-message-icon"
                              ><i class="ri-check-double-line align-bottom"></i
                            ></span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <!-- chat-list -->
                  </ul>
                  <!-- end chat-conversation-list -->
                </div>
              </div>

              <!-- end chat-conversation -->

              <div
                class="chat-input-section p-3 p-lg-4"
                v-show="level_name != 'ADMINISTRATOR'"
              >
                <form
                  @submit.prevent="SendMessage"
                  enctype="multipart/form-data"
                >
                  <div class="row g-0 align-items-center">
                    <div class="col">
                      <div class="chat-input-feedback">
                        Please Enter a Message
                      </div>
                      <input
                        type="text"
                        class="form-control chat-input bg-light border-light"
                        v-model="inputMessage"
                        placeholder="Type your message..."
                        autocomplete="off"
                        :disabled="status == 'closed'"
                      />
                    </div>
                    <div class="col-auto">
                      <div class="chat-input-links ms-2">
                        <div class="links-list-item">
                          <button
                            type="submit"
                            class="btn btn-success chat-send waves-effect waves-light"
                            :disabled="status == 'closed'"
                          >
                            <i class="ri-send-plane-2-fill align-bottom"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderVue from "@/components/Header.vue";
import ProgressTiket from "@/components/ProgressTiket.vue";
import db from "@/db";
import axios from "axios";
export default {
  components: {
    ProgressTiket,
    HeaderVue,
  },
  data() {
    return {
      inputMessage: null,
      namaLocalStorage: localStorage.getItem("nama"),
      keyLocalStorage: window.atob(this.$route.query.email),
      autono: window.atob(this.$route.query.q),
      status: window.atob(this.$route.query.status),
      db_url: null,
      state: {
        username: "",
        messages: [],
      },
      showChat: false,
      falseChat: "user-chat w-100 overflow-hidden",
      level_name: localStorage.getItem("level_name"),
    };
  },
  methods: {
    SendMessage() {
      const messagesRef = db.database().ref(this.db_url);
      if (this.inputMessage === "" || this.inputMessage === null) {
        return;
      }
      const message = {
        username: localStorage.getItem("nama"),
        content: this.inputMessage,
        date: Date(),
      };
      messagesRef.push(message);
      this.inputMessage = "";
    },
    getTime(date) {
      if (date != null) {
        const splited = new Date(date).toLocaleTimeString("default", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return splited;
      }
    },
    getDate(date) {
      if (date != null) {
        const splited = new Date(date).toLocaleDateString("id-ID");
        return splited;
      }
    },
    updateClass(newClass) {
      this.showChat = newClass;
    },
    removeClass() {
      this.showChat = false;
    },
  },
  mounted() {
    // console.log(this.autono);
    const new_aut = this.keyLocalStorage + "vta937iV99cqUgf" + this.autono;
    const key = this.autono + "vta937iV99cqUgf";
    const db_url = window.btoa(new_aut).replace(/=+$/, "");
    this.db_url = db_url;
    console.log(db_url);
    if (this.status === "open") {
      const messagesRef = db.database().ref(db_url);
      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
            date: data[key].date,
          });
        });
        this.state.messages = messages;
      });
    } else {
      console.log(this.autono);
      try {
        axios
          .post("https://api.vitech.asia/api/chatdb", {
            id: this.autono,
          })
          .then((res) => {
            // console.log(res.data.data);
            const data = res.data.data;
            let messages = [];
            Object.keys(data).forEach((key) => {
              messages.push({
                id: key,
                username: data[key].username,
                content: data[key].content,
                date: data[key].created_on,
              });
            });
            this.state.messages = messages;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
<!-- <script>
import { reactive, onMounted, ref } from "vue";
import ProgressTiket from "@/components/ProgressTiket.vue";
import db from "@/db";
import { useRoute } from "vue-router";
export default {
  components: {
    ProgressTiket,
  },
  setup() {
    const inputMessage = ref("");

    const namaLocalStorage = localStorage.getItem("nama");
    const keyLocalStorage = atob(sessionStorage.getItem("key"));
    const route = useRoute();
    const autono = window.atob(route.query.q);
    const status = window.atob(route.query.status);
    const new_aut = window.btoa(autono + "vta937iV99cqUgf").replace(/=+$/, "");

    const db_url = window.btoa(keyLocalStorage + new_aut).replace(/=+$/, "");

    const state = reactive({
      username: "",
      messages: [],
    });

    const SendMessage = () => {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      const messagesRef = db.database().ref(db_url);
      if (inputMessage.value === "" || inputMessage.value === null) {
        return;
      }
      const message = {
        username: localStorage.getItem("nama"),
        content: inputMessage.value,
        date: dateTime,
      };
      messagesRef.push(message);
      inputMessage.value = "";
    };

    const deleteField = (id) => {
      const dbRef = db.database().ref(db_url + "/" + id);
      dbRef.remove();
    };

    onMounted(() => {
      console.log(autono);
      const messagesRef = db.database().ref(db_url);
      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
            date: data[key].date,
          });
        });
        state.messages = messages;
      });
    });

    return {
      state,
      inputMessage,
      SendMessage,
      namaLocalStorage,
      deleteField,
      autono,
      status,
    };
  },
};
</script> -->
