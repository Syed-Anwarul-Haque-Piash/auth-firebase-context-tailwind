import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext=createContext(null)

const auth=getAuth(app)
const googleProvider=new GoogleAuthProvider()
const AuthProviders = ({children}) => {
    //const user={displayName: "Piash"}
    const[user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        signOut(auth)
    }
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentUser=>{
            console.log('auth state change',currentUser)
            setUser(currentUser)
            setLoading(false)
        })
        return()=>{
           unsubscribe()
        }
    },[])
    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;