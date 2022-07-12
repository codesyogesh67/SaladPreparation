import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBshEZVPDh6pSJOr04rMSSqFrgx12YKNgs",
    authDomain: "saladbar-33a8f.firebaseapp.com",
    projectId: "saladbar-33a8f",
    storageBucket: "saladbar-33a8f.appspot.com",
    messagingSenderId: "466449330840",
    appId: "1:466449330840:web:f31cbb4ad3501915c716ed",
    measurementId: "G-9PX4J1DP07"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

const db = firebaseApp.firestore()

export { auth, db } 