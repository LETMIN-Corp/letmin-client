import React, { useEffect, useReducer, createContext } from 'react';
import { AuthReducer } from "./AuthReducer";
import { SET_LOADING, SET_USER_DATA, LOGOUT, ERROR } from "./Types";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const InitialState : any = {
    loading: false,
    userData: {
        role: '',
    },
    isAuthenticated: false,
};

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthContext = createContext(InitialState);

export const AuthState = ({ children } : any) => {

    const navigate = useNavigate();
    const [state, dispatch] = useReducer(AuthReducer, InitialState);

    const setLoading = () => dispatch({
        type: SET_LOADING,
        payload: undefined
    });

    const removeLoading = () => dispatch({ type: ERROR });

    const getRole = () => {
        // @ts-ignore:next-line
        return state.userData.role || (Cookies.get('token') != null ? jwtDecode(Cookies.get('token').toString()).role : '');
    }

    const checkAuthStatus = async () => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken:any = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                signOut();
            } else {
                dispatch({
                    type: SET_USER_DATA,
                    payload: decodedToken
                });
            }
        }
    };

    async function signIn(role: string, userCredentials: any): Promise<any> {
        if (!userCredentials) return;
        setLoading();

        return await axios.post(`${API_URL}/api/users/login-${role}`, userCredentials)
        .then((res) => {
            if (res.status === 200) {
                Cookies.set('token', res.headers.authorization);
                dispatch({
                    type: SET_USER_DATA,
                    payload: res.data
                });
            }
        })
        .catch((err) => {
            removeLoading();
            console.log('Error: ', err);
            return err;
        })
    }

    async function signOut(): Promise<void> {
        Cookies.remove('token');
        dispatch({ type: LOGOUT});
        navigate('/');
        return Promise.resolve();
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
            getRole,
            signIn,
            signOut,
            checkAuthStatus,
            setUserData
        }}>
            { children }
        </AuthContext.Provider>
    )

};