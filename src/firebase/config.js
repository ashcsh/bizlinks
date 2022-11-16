//firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, updateProfile } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC-eLUsNb7RN7wQ_IuT13u4Oo0eazjnOZ4",
    authDomain: "bizlinks-531f7.firebaseapp.com",
    projectId: "bizlinks-531f7",
    storageBucket: "bizlinks-531f7.appspot.com",
    messagingSenderId: "888976329432",
    appId: "1:888976329432:web:5730bbc70e58aa9a4825ad"
  };

  //initialize firebase
  const app = initializeApp(firebaseConfig)

  //initalize firestore
  const db = getFirestore()

  //initalize authentification
  const auth = getAuth()

  //intialize storage
  const storage = getStorage(app)

  export { db, auth, updateProfile, storage }