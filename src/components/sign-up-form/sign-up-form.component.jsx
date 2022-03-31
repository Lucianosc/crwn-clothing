import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';

const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    confirmedPassword: '',
}

function SingUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password, confirmedPassword } = formFields;

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmedPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { name });
            resetFormFields();

        } catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('email already in use');
            } else {
                console.log(error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value }); // ver bien
    }

    return (
        <div className='sign-un-container'>
            <h2>Sign Up</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <FormInput
                        label="Name"
                        type='text'
                        required onChange={handleChange}
                        name='name'
                        value={name}
                    />
                </div>
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
                <div>
                    <FormInput
                        label="Confirm Password"
                        type='password'
                        required onChange={handleChange}
                        name='confirmedPassword'
                        value={confirmedPassword}
                    />
                </div>
                <div>
                    <Button type="submit">Sign Up</Button>
                </div>
            </form>
        </div>
    );
}

export default SingUpForm;