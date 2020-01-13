import React, { useEffect, useState } from "react";
import {firebaseConfig} from "../data/apiConfig";
import "firebase/auth";

const firebase = require("firebase/app");

export const firebaseApp = firebase.initializeApp(firebaseConfig);


export const AuthenticatorContext = React.createContext();

//Stores the authentication status
export const AuthenticatorProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
   
    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthenticatorContext.Provider value={{ currentUser }}>
            {children}
        </AuthenticatorContext.Provider>
    )
}