/* =========================================================
   FIREBASE MESSAGING SERVICE WORKER
========================================================= */

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.19.0/firebase-messaging-compat.js"
);


/* =========================================================
   FIREBASE
========================================================= */

firebase.initializeApp({

  apiKey:
    "AIzaSyDTAxtHeLqrexk6QJjbQUgVAnKH7F_QS1g",

  authDomain:
    "websirp-bafb8.firebaseapp.com",

  databaseURL:
    "https://websirp-bafb8-default-rtdb.firebaseio.com",

  projectId:
    "websirp-bafb8",

  storageBucket:
    "websirp-bafb8.appspot.com",

  messagingSenderId:
    "200318173998",

  appId:
    "1:200318173998:web:3a460bcb4cdc4dc11ef0bf",

  measurementId:
    "G-P8E559PRWW"

});


/* =========================================================
   MESSAGING
========================================================= */

const messaging =
  firebase.messaging();


/* =========================================================
   BACKGROUND MESSAGES
========================================================= */

messaging.onBackgroundMessage(
  payload => {

    console.log(
      "[FCM] Background message:",
      payload
    );


    /*
      If Firebase sends a normal notification payload,
      Android/FCM can display it automatically.

      We only manually display DATA-ONLY messages here.
    */

    if (payload.notification) {
      return;
    }


    const title =
      payload.data?.title ||
      "Sawantwadi";


    const body =
      payload.data?.body ||
      "New notification";


    self.registration.showNotification(
      title,
      {
        body: body,

        icon:
          payload.data?.icon ||
          "./icon-192.png",

        badge:
          payload.data?.badge ||
          "./icon-192.png",

        data: {
          url:
            payload.data?.url ||
            "./"
        }
      }
    );

  }
);


/* =========================================================
   NOTIFICATION CLICK
========================================================= */

self.addEventListener(
  "notificationclick",
  event => {

    event.notification.close();


    const data =
      event.notification.data || {};


    const targetURL =
      data.url || "./";


    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      })

      .then(
        clientList => {

          for (
            const client of clientList
          ) {

            if (
              "focus" in client
            ) {

              client.navigate(
                targetURL
              );

              return client.focus();

            }

          }


          if (
            clients.openWindow
          ) {

            return clients.openWindow(
              targetURL
            );

          }

        }
      )

    );

  }
);
