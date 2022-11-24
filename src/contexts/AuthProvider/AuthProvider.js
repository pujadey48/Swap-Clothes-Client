import React from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';
// import { getUrl } from '../../Util/Util';

export const AuthContext = createContext();
const auth = getAuth(app);

// export const getJWT = (currentUser)=> {
//     // get jwt token
//     fetch(getUrl('/jwt'), {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(currentUser)
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log("token",data);
//             // local storage is the easiest but not the best place to store jwt token
//             localStorage.setItem('jwt-token', data.token);
//         });
// }

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const providerLogin = (provider) =>{
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        localStorage.removeItem('jwt-token');
        return signOut(auth);
    }
    

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        setLoading,
        createUser, 
        providerLogin,
        login, 
        logOut,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;