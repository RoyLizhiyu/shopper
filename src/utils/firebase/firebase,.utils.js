
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: 'select_account'
  })

  export const auth = getAuth(); // auth keeps track of the current authentication states.

  export const signInWithGooglePopup = ()=>signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = ()=>signInWithRedirect(auth,googleProvider)

  export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
    if (! email || !password) return;
    return await signInWithEmailAndPassword(auth,email, password)
  }
  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if (! email || !password) return;
    return await createUserWithEmailAndPassword(auth,email, password)

  }

  export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth,callback)
  };

  export const signOutUser = async ()=> signOut(auth);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo={})=>{
    if(!userAuth) return;
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
          ...additionalInfo,
        });
      } catch (error) {
        console.log('error creating a user',error);
      }
    }

   // if user data exists
   return userDocRef;
  }