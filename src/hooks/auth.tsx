import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@services/AuthService'

export interface AuthData {
    id: number,
    token: string;
    email: string;
    name: string;
}

interface AuthContextData {
    authData?: AuthData;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;    
    loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData)
;

export const AuthProvider: React.FC = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(loadFromStorage, 500)
    }, [])

    async function loadFromStorage(){
        const auth = await AsyncStorage.getItem("@AuthData");
        if(auth) setAuth(JSON.parse(auth) as AuthData);
        setLoading(false)
    }

    async function signIn(email: string, password: string){
        const auth = await authService.signIn(email, password);
        setAuth(auth);
        AsyncStorage.setItem("@AuthData", JSON.stringify(auth));
    }   
        
    async function signOut(){
        setAuth(undefined);
        AsyncStorage.removeItem("@AuthData");
    }

    return (
        <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const ctx = useContext(AuthContext);
    
    return ctx;
}

