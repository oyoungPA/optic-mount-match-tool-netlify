import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: "optic-mount-match-tool",
  storageBucket: "optic-mount-match-tool.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const initializeFirebaseApp = () => {
  return initializeApp(firebaseConfig);
};

const getFirestoreCollection = async (collectionName) => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => doc.data());
};

const getFirebaseData = async () => {
  const app = initializeFirebaseApp();
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, process.env.email, process.env.password);
  const data = await getFirestoreCollection('optic-mount-match');
  return data;
};

export { getFirebaseData };
