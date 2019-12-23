import React, { useEffect, useState } from "react";
import app from "./firebase";

export const AuthenticatorContext = React.createContext();

//Stores the authentication status
export const AuthenticatorProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthenticatorContext.Provider value={{ currentUser }}>
            {children}
        </AuthenticatorContext.Provider>
    )
}