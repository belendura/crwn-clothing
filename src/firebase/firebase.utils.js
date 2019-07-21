import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config={
    apiKey: "AIzaSyBuqzE9uPHrbPawy5Ge_C0OPKEb9BjTPWM",
    authDomain: "crwn-db-f0f6e.firebaseapp.com",
    databaseURL: "https://crwn-db-f0f6e.firebaseio.com",
    projectId: "crwn-db-f0f6e",
    storageBucket: "",
    messagingSenderId: "214708345378",
    appId: "1:214708345378:web:64698a3908dec741"
  };

  export const createUserProfileDocument =async (userAuth, additionalData)=>{
      if(!userAuth) return;

      const userRef=firestore.doc(`users/${userAuth.uid}`);

      const snapShot=await userRef.get();

      console.log("user",snapShot);

      if(!snapShot.exists){
        const {displayName,email }=userAuth;
        const createdAt= Date();
        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData,
          })
        }catch(error){
          console.log("Error creating user", error.message);
        }   
      }
    return userRef;
  }

  firebase.initializeApp(config);

  export const auth =firebase.auth();
  export const firestore =firebase.firestore();

  const provider= new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle=()=> auth.signInWithPopup(provider);

  export default firebase;