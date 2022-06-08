import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebase from "firebase/compat";
import MessagePayload = firebase.messaging.MessagePayload;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getTokenWrapper = (setTokenFound: (_v: string | null) => void) => {
  return getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(null);
        // shows on the UI that permission is required
      }
    })
    .catch(() => {
      // This catch blocks prevent an error from beeing throwing if the
      // notifications are not allowed
      setTokenFound(null);
    });
};

export const onMessageListener = () =>
  new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload) => {
      console.log({ payload });
      resolve(payload);
    });
  });
