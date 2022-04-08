import React from 'react'
import {signInWithGooglePopup} from '../../utils/firebase/firebase,.utils';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase,.utils';
function SignIn() {
    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };
  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
    
  )
}

export default SignIn