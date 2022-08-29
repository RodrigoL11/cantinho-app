import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/AuthService'

export interface AuthData {
    token: string;
    email: string;
    name: string;
}

export interface SignUpPropsData{
    email: string;
    name: string;
    password: string;
    token: string;
}

interface AuthContextData {
    authData?: AuthData;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signUp: (data: SignUpPropsData) => Promise<void>
    loading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData)
;

export const AuthProvider: React.FC = ({ children }) => {
    const [authData, setAuth] = useState<AuthData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(loadFromStorage, 2000)
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

    async function signUp(data: SignUpPropsData){
        const auth = await authService.signUp(data);
        setAuth(auth);
        AsyncStorage.setItem("@AuthData", JSON.stringify(auth));
    }
        
    async function signOut(){
        setAuth(undefined);
        AsyncStorage.removeItem("@AuthData");
    }

    return (
        <AuthContext.Provider value={{authData, loading, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(){
    const ctx = useContext(AuthContext);
    
    return ctx;
}

