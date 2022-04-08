import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB3julF6nUI3kGsa2aSFil2VP_Syc4zJ84",
    authDomain: "shopper-78626.firebaseapp.com",
    projectId: "shopper-78626",
    storageBucket: "shopper-78626.appspot.com",
    messagingSenderId: "467608516233",
    appId: "1:467608516233:web:5d7a3bec8a364a25b6f858",
    measurementId: "G-80HELL8R91"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account'
  })

  export const auth = getAuth();

  export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);
  

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef = doc(db, 'users',userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    
     // if user data not exists
    if (!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating a user',error);
      }
    }

   // if user data exists
   return userDocRef;
  }