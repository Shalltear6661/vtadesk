import firebase from "firebase/compat/app";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyAzPea_R5I5cKMbbi584TCQOrxORlRPF9s",
  authDomain: "chat-vta.firebaseapp.com",
  databaseURL:
    "https://chat-vta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-vta",
  storageBucket: "chat-vta.appspot.com",
  messagingSenderId: "1034115409365",
  appId: "1:1034115409365:web:a2db25e4a871b1f751895c",
};

const db = firebase.initializeApp(config);
export default db;
