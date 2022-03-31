import { useState } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}

function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password, } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function signInWithGoogle() {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password')
                    break; // es como un return, sale del switch
                case 'auth/user-not-found':
                    alert('incorrect email')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value }); // ver bien
    }

    return (
        <div className='sign-in-container'>
            <h2>Sign In</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <FormInput
                        label="Email"
                        type='email'
                        required onChange={handleChange}
                        name='email'
                        value={email}
                    />
                </div>
                <div>
                    <FormInput
                        label="Password"
                        type='password'
                        required onChange={handleChange}
                        name='password'
                        value={password}
                    />
                </div>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;