import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: "optic-mount-match-tool",
  storageBucket: "optic-mount-match-tool.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

firebase.initializeApp(firebaseConfig);

const getFirebaseData = async () => {
  const auth = firebase.auth();
  await auth.signInWithEmailAndPassword(process.env.email, process.env.password);
  const db = firebase.firestore();
  const querySnapshot = await db.collection('optic-mount-match').get();
  const data = querySnapshot.docs.map(doc => doc.data());
  return {
    data,
    env: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    }
  };
};

exports.handler = async () => {
  const { data, env } = await getFirebaseData();
  return {
    statusCode: 200,
    body: JSON.stringify({ data, env }),
  };
};