import React,{useState} from 'react'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import { signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase,.utils';
const defaultFormFields = {
    email: '',
    password: '',
}
function SignInForm( ) {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const signInWithGoogle = async (e)=>{
        e.preventDefault();
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleChange = (event)=>{
        const {name,value} = event.target;
        setFormFields({...formFields, [name]:value})

    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('inccorect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
            
        }
    }
  return ( 
      <div className='sign-in-form-container'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
            label='email'
            required 
            type='email'
            value = {email}
            name='email'
            onChange={handleChange}
            />
            <FormInput 
            label='password'
            required 
            type='password'
            value = {password}
            name='password'
            onChange={handleChange}
            />
            <div className='buttons-container'>
                <Button type='submit'>SIGN IN</Button>
                <Button onClick={signInWithGoogle} buttonType='google'>SIGN IN WITH GOOGLE</Button>
            </div>
        </form>


      </div>
  )
}

export default SignInForm