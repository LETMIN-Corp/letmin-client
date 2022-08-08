import React, { useEffect, useReducer, createContext } from 'react';
import { Reducer } from "./Reducer";
import { SET_LOADING, SET_USER_DATA } from "./Types";

const InitialState = {
    loading: false,
    userData: {},
    isAuthenticated: false,
};

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthContext = createContext(InitialState);

export const AuthState = ({ children } : any) => {

    const [state, dispatch] = useReducer(Reducer, InitialState);

    const setLoading = () => dispatch({
        type: SET_LOADING,
        payload: undefined
    });

    async function requestData(url: string, method: string, data?: any) : Promise<any> {
        const token = localStorage.getItem('token');

        return await fetch(`${API_URL}/api${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
                "x-auth-token": token || ''
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            return JSON.stringify(err);
        })
    }

    const checkAuthStatus = async () => {
        // checks is there's a token - returns true or false as data
        const data = await requestData('/users/profile', 'GET');
        if(data != '{}') {
            // todo: checks if the token is valid and returns the user's data
            return dispatch({ type: SET_USER_DATA, payload: data });
        }
    };

    async function signIn(role: string, userCredentials: any): Promise<any> {
        setLoading();
        const data = await requestData(`/users/login-${role}`, 'POST', userCredentials);
        // sleep for 2 seconds to simulate loading
        //await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        dispatch({ type: SET_USER_DATA, payload: data });
        return data;
    }

    async function signOut(): Promise<void> {
        console.log('signOut');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: SET_USER_DATA, payload: {} });
    }

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const setUserData = (data:any) => dispatch({ type: SET_USER_DATA, payload: data });

    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            userData: state.userData,
            setLoading,
            signIn,
            signOut,
            checkAuthStatus,
            setUserData
        }}>
            { children }
        </AuthContext.Provider>
    )

};