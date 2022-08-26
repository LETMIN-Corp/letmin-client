import React, { useEffect, useReducer, createContext } from 'react';
import { Reducer } from "./Reducer";
import { SET_LOADING, SET_USER_DATA, LOGOUT } from "./Types";
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
    const [state, dispatch] = useReducer(Reducer, InitialState);

    const setLoading = () => dispatch({
        type: SET_LOADING,
        payload: undefined
    });

    async function loginGoogle(token: string) {
        if (!token) return;
        
        setLoading();

        await axios.post(`${API_URL}/api/users/auth/google`, { token })
        .then((res) => {
            if (res.status === 200) {
                Cookies.set('token', res.data.token);
                dispatch({
                    type: SET_USER_DATA,
                    payload: jwtDecode(res.data.token)
                });
                console.log(jwtDecode(res.data.token));
                navigate('user/profile');
                
            } else {
                console.log('error', res);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getRole = () => {
        return state.userData.role;
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
        setLoading();

        await axios.post(`${API_URL}/api/users/login-${role}`, userCredentials)
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                Cookies.set('token', res.data.token);
                dispatch({
                    type: SET_USER_DATA,
                    payload: jwtDecode(res.data.token)
                });
                navigate('user/profile');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async function signOut(): Promise<void> {
        Cookies.remove('token');
        dispatch({ type: LOGOUT});
        navigate('/');
        return;
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
            loginGoogle,
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