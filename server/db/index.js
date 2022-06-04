const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const firebaseConfig = {
  apiKey: "AIzaSyAg0x4mqnBMLPRE4i4clRyGiWHDcqDurU4",
  authDomain: "dnd-organizer-7b348.firebaseapp.com",
  projectId: "dnd-organizer-7b348",
  storageBucket: "dnd-organizer-7b348.appspot.com",
  messagingSenderId: "692792734996",
  appId: "1:692792734996:web:d29e5163d5433582e6fe01",
  measurementId: "G-SK26PKC8X5",
};
let spells = [];
const app = initializeApp(firebaseConfig);

const firebaseDB = getFirestore(app);

module.exports = firebaseDB;
