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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) =>{
    const collectionRef= firestore.collection(collectionKey);

    console.log(collectionRef);

    const batch=firestore.batch();
    objectsToAdd.forEach(element => {
      const newDocRef=collectionRef.doc();
      batch.set(newDocRef,element);
    });

    return await batch.commit()
  }

  export const convertCollectionsSnapshotToMap = (collections) =>{
    const transformedCollection=collections.docs.map(doc=>{
    const {title, items} =doc.data();
  
    return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    
    return transformedCollection.reduce((accumulator,collection)=>{
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    },{});
  };

  export const getCurrentUser = ()=>{
    return new Promise((resolve, reject) =>{
      const unsubscribe= auth.onAuthStateChanged( userAuth =>{
      unsubscribe();
      resolve(userAuth);
      },reject)
    })
  }

  export const auth =firebase.auth();
  export const firestore =firebase.firestore();

  export const googleProvider= new firebase.auth.GoogleAuthProvider();

  googleProvider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle=()=> auth.signInWithPopup(googleProvider);

  export default firebase;