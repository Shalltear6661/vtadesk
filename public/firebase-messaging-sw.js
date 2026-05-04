// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// import eventBus from "@/event-bus";
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAzPea_R5I5cKMbbi584TCQOrxORlRPF9s",
    authDomain: "chat-vta.firebaseapp.com",
    databaseURL:
        "https://chat-vta-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-vta",
    storageBucket: "chat-vta.appspot.com",
    messagingSenderId: "1034115409365",
    appId: "1:1034115409365:web:a2db25e4a871b1f751895c",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    // eventBus.emit('notif-event', { message: payload.notification.title });
    // console.log(
    //     '[firebase-messaging-sw.js] Received background message',
    //     payload.notification.title
    // );
    // Customize notification here
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //     body: payload.notification.body,
    //     icon: '/images/support.png'
    // };

    // self.registration.showNotification(notificationTitle, notificationOptions);
});
