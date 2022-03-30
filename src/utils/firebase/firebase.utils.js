import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, getDoc, setDoc, doc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3PorRILTsub4DqsUePCsX6dsyqeLNZTQ",
    authDomain: "crwn-clothing-db-5586f.firebaseapp.com",
    projectId: "crwn-clothing-db-5586f",
    storageBucket: "crwn-clothing-db-5586f.appspot.com",
    messagingSenderId: "21916339983",
    appId: "1:21916339983:web:89cd10744130fe779ff87a"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log(error);
        }
    }

    return userDocRef;
}