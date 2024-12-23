import { createContext, useState, useContext } from "react";


const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState(undefined);

    return(
        <AuthContext.Provider value={{userId, setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);