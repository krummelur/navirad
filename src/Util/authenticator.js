import React, {useEffect, useState} from "react";
import { getAuth } from "firebase/auth";

export const AuthenticatorContext = React.createContext();

//Stores the authentication status
export const AuthenticatorProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        getAuth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthenticatorContext.Provider value={{currentUser}}>
            {children}
        </AuthenticatorContext.Provider>
    )
};