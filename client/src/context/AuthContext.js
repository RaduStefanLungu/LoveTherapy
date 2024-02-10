import React, { useState,useContext, useEffect } from 'react'
import { auth } from '../firebase.js'

import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword, GoogleAuthProvider,FacebookAuthProvider , signInWithPopup  } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)


    function signup(email,password){
        console.log(email,password);
        return createUserWithEmailAndPassword(auth,email,password)
        // return auth.createUserWithEmailAndPassword(email,password
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
        // return auth.loginWithEmailAndPassword(email,password)
    }

    function loginWithGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth,provider)
    }

    function loginWithFacebook(){
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth,provider)
    }

    function logout(){
        return signOut(auth)
    }

    function resetPassword(email){
        return sendPasswordResetEmail (auth,email)
    }

    function updateEm(email){
        return updateEmail(currentUser,email)
    }

    function updatePswd(password){
        return updatePassword(currentUser,password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe  // this will unsubscribe the current user whenever we unmount the component.
    },[])
    

    const value = {
        currentUser,
        signup,
        login,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        resetPassword,
        updateEm,
        updatePswd
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
