import React from 'react';
import { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUrl } from '../../Util/Util';
import useAdmin from '../../hooks/useAdmin';

export const AuthContext = createContext();
const auth = getAuth(app);

export const getJWT = (currentUser)=> {
    // get jwt token
    fetch(getUrl('/jwt'), {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log("token",data);
            // local storage is the easiest but not the best place to store jwt token
            localStorage.setItem('jwt-token', data.token);
        });
}

export const normalizeUserData = (userData) => {
    if (!userData) return userData;

    const uid = userData?.uid || "unregistered";
    const name = userData?.displayName  || "Anonimous";
    const email = userData?.email;
    const photoURL = userData?.photoURL || "";
    let userRole = localStorage.getItem('role');
    if(!userRole){
        userRole = 'buyer';
    }
    const role = userRole;

    return {uid, name, email, photoURL, role};
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('buyer');
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);


    const providerLogin = (provider) =>{
        setLoading(true);
        localStorage.setItem('role', role);
        return signInWithPopup(auth, provider);
    }

    const createUser = (email, password, userRole) => {
        setLoading(true);
        localStorage.setItem('role', userRole);
        setRole(userRole)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password, userRole) =>{
        setLoading(true);
        localStorage.setItem('role', userRole);
        setRole(userRole)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('role');
        return signOut(auth);
    }

    useEffect( () =>{
        let userRole = localStorage.getItem('role');
        if(!userRole){
            userRole = 'buyer';
        }
        setRole(userRole);
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            const normalizedUser = normalizeUserData(currentUser);
            console.log("CurrentUser", currentUser);
            console.log("NormalizedUser", normalizedUser);
            setUser(normalizedUser);
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