import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const App = initializeApp({
    apiKey: "AIzaSyDjfmzXOhsVIj_DIzxDKfW5vSEeeBkwrbs",
    authDomain: "iskipper.firebaseapp.com",
    projectId: "iskipper",
    storageBucket: "iskipper.appspot.com",
    messagingSenderId: "1084936158936",
    appId: "1:1084936158936:web:294e5636f4d56569d621ad",
    measurementId: "G-LQTZJB9MK8"
})

const db = getFirestore(App)
const auth = getAuth(App)

export { db, auth }