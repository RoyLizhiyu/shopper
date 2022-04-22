// user context here is a centralized place to organize to current user in a web instance.
// Whenever this component loads, it will load up an event listener that will always listen to
// any changes from the auth object. When it detects a change in auth: three scenarios: 1. 
// a new user signs up via email/pwd, in which case the auth will be auto logged.  2. a user signed up/logged in
// by google sign in 3. a user logged in via email and password.
// in any of these changes, if there's a current user in auth, then it will try to create a user document in
// my firebase database. and then it will set the currentUser state to that user.
// and whenver the component unmount,  'return unsubscribe' will ensure that the event listner is cleared out.
import {createContext,useState,useEffect} from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase,.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: ()=>null,
})

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};
    useEffect(()=>{
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if (user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe;
    },[])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}