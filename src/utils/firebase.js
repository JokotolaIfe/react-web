import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDur4MgNJE5sXax4qv8kJLpz5cecLNcpNk",
  authDomain: "jokotola-ife-react.firebaseapp.com",
  projectId: "jokotola-ife-react",
  storageBucket: "jokotola-ife-react.appspot.com",
  messagingSenderId: "181488617194",
  appId: "1:181488617194:web:dfb0e1a50ddba79d7c3993"
};

// initialize firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// for db, auth and storage
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();
export { auth, db, storage };