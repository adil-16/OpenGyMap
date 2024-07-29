importScripts(
  "https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBfdvFMBVDtZxDwOdcKHYmLljo6VLdvghY",
  authDomain: "opengymapp-172a8.firebaseapp.com",
  projectId: "opengymapp-172a8",
  storageBucket: "opengymapp-172a8.appspot.com",
  messagingSenderId: "495177834817",
  appId: "1:495177834817:web:2fa0a5ef74c00f2a7641c0",
  measurementId: "G-Z9L22JM25Q",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
