import React,{useEffect} from 'react'
import { getRedirectResult } from 'firebase/auth';
import {auth, signInWithGooglePopup,signInWithGoogleRedirect,createUserDocumentFromAuth} from '../../utils/firebase/firebase,.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
function SignIn() {
  useEffect(()=>{

    (async ()=>{
      const response = await getRedirectResult(auth);
      if (response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    })();

  },[])
    const logGoogleUser = async (e) =>{
        e.preventDefault();
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    // all codes after the redirect will not run, because the page will be redirected to another page.
    const logGoogleRedirectUser = async ()=>{
      const {user} = await signInWithGoogleRedirect();
    }
  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
        <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        <SignUpForm />
    </div>
    
  )
}

export default SignIn