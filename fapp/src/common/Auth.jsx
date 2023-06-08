import React, {useEffect, useState} from "react";
import {auth} from "../backend/firebase";

export const AuthContext = React.createContext(undefined);


// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            window.sessionStorage.setItem("user", JSON.stringify(user))
            setPending(false)
        });
    }, []);

    if(pending){
        // eslint-disable-next-line react/react-in-jsx-scope
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            /* eslint-disable-next-line react/jsx-no-constructed-context-values */
            value={{ currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}


