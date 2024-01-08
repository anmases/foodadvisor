import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const firebaseConfig = {

  apiKey: "AIzaSyBO1EaGU-Yh6W1rvDZK7Dx8HFJrSxMMFRA",

  authDomain: "foodadvisor04.firebaseapp.com",

  projectId: "foodadvisor04",

  storageBucket: "foodadvisor04.appspot.com",

  messagingSenderId: "788196214892",

  appId: "1:788196214892:web:58cfa424ea602ed463f049"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth, onAuthStateChanged};