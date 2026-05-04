import * as firebase from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzPea_R5I5cKMbbi584TCQOrxORlRPF9s",
  authDomain: "chat-vta.firebaseapp.com",
  databaseURL:
    "https://chat-vta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-vta",
  storageBucket: "chat-vta.appspot.com",
  messagingSenderId: "1034115409365",
  appId: "1:1034115409365:web:a2db25e4a871b1f751895c",
};

// Initialize Firebase
const init = firebase.initializeApp(firebaseConfig);

const msg = getMessaging();
const db = getFirestore(init);

export default { msg, onMessage, getToken, db };
