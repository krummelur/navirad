import React, {useEffect, useState} from "react";
import firebaseApp from "./firebase";

export const AuthenticatorContext = React.createContext();

//Stores the authentication status
export const AuthenticatorProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthenticatorContext.Provider value={{currentUser}}>
            {children}
        </AuthenticatorContext.Provider>
    )
};