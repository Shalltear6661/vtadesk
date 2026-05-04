<template>
  <!-- <HeaderVue /> -->
  <router-view />
  <FooterVue />
</template>

<style scoped>
#app {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import { provide } from "vue";
import store from "./store";
// import HeaderVue from "@/components/Header.vue";
import FooterVue from "@/components/Footer.vue";
import firebase from "@/services/firebaseInit";
const messaging = firebase.msg;
export default {
  methods: {
    askBrowserPermission() {
      // Get registration token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.

      firebase
        .getToken(messaging, {
          vapidKey:
            "BMaJXxtfEXR1wb_TRadXe923ignE65pwf44mEk0gp-USzkuOz8Etacgo16JQCqL3SrtaCcLHOEpSgqUdB7SY3TU",
        })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            console.log("Ready");
            firebase.onMessage(messaging, (payload) => {
              // console.log("Message received. ", payload.notification.title);
              let existingArray =
                JSON.parse(localStorage.getItem("notif-key")) || [];

              const valueToAdd = payload.notification.title;
              if (!existingArray.includes(valueToAdd)) {
                existingArray.push(valueToAdd);
                localStorage.setItem(
                  "notif-key",
                  JSON.stringify(existingArray)
                );
              }

              window.dispatchEvent(
                new CustomEvent("notif-change", {
                  detail: {
                    storage: localStorage.getItem("notif-key"),
                  },
                })
              );
            });

            if (currentToken != "") {
              localStorage.setItem("firebaseToken", currentToken);
            }
          } else {
            // Show permission request UI
            // console.log(
            //   "No registration token available. Request permission to generate one."
            // );
            // ...
          }
        })
        .catch((err) => {
          // console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    },
    handlePermission() {
      navigator.permissions
        .query({ name: "notifications" })
        .then(this.permissionQuery)
        .catch("error");
    },
    permissionQuery(result) {
      var newPrompt;

      if (result.state == "granted") {
        // notifications allowed, go wild
        this.askBrowserPermission();
      } else if (result.state == "prompt") {
        // we can ask the user
        newPrompt = Notification.requestPermission();
      } else if (result.state == "denied") {
        // notifications were disabled
      }

      result.onchange = () => {
        this.askBrowserPermission();
      };

      return newPrompt || result;
    },
  },
  created() {
    this.handlePermission();
  },
  mounted() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((regitration) => {
          console.log("Register Success:", regitration);
        })
        .catch((error) => {
          console.log("Register Failed:", error);
        });
    }
  },
  components: {
    // HeaderVue,
    FooterVue,
  },
  setup() {
    provide("store", store);
  },
};
</script>
