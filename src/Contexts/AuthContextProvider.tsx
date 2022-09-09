import React, { useEffect, useReducer, createContext } from 'react';
import { AuthReducer } from "../Reducers/AuthReducer";
import ReducerEnum from "../Enums//ReducerEnum";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const InitialState : any = {
    loading: false,
    userData: {
        role: {},
    },
    isAuthenticated: false,
};

const API_URL = import.meta.env.VITE_APP_API_URL;

export const AuthContext = createContext(InitialState);

export const AuthState = ({ children } : any) => {

    const navigate = useNavigate();
    const [state, dispatch] = useReducer(AuthReducer, InitialState);

    const setLoading = () => dispatch({ type: ReducerEnum.set_loading, payload: undefined});
    const removeLoading = () => dispatch({ type: ReducerEnum.error });
    const setUserData = (data:any) => dispatch({ type: ReducerEnum.set_user_data, payload: data });
    const getRole = () => {
        // @ts-ignore:next-line
        return state.userData.role || (Cookies.get('token') != null ? jwtDecode(Cookies.get('token').toString()).role : '');
    }

    // Auth function
    const getInitialUserData = async () => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken:any = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                signOut();
            } else {
                setUserData(decodedToken);
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
                setUserData(res.data);

                return navigate(`/${role}`);
            }
            return res;
        })
        .catch((err) => {
            removeLoading();
            console.log('Error: ', err);
            alert('Erro ao fazer login');
            return err;
        })
    }

    const registerCompany = async (userCredentials: any): Promise<any> => {
        if (!userCredentials) return;

        setLoading();

        return await axios.post(`${API_URL}/api/users/register-company`, userCredentials)
        .then((res) => {
            if (res.status === 201) {
                Cookies.set('token', res.headers.authorization);
                setUserData(res.data);

                return navigate(`/company`);
            }
            return res;
        })
        .catch((err) => {
            removeLoading();
            console.log('Error: ', err);
            return err;
        })
    }

    async function signOut(): Promise<void> {
        Cookies.remove('token');
        dispatch({ type: ReducerEnum.logout });
        navigate('/');
        return Promise.resolve();
    }
    // End auth functions

    useEffect(() => {
        getInitialUserData();
    }, []);

    // Company function
    const getCompanyData = async (id: string) => {
        setLoading();
        // todo: get company data
    }

    const registerVacancy = async (company_id: string, vacancy: any) => {
        console.log('company_id: ', company_id);

        return axios.post(`${API_URL}/api/users/register-vacancy`, vacancy)
        .then((res) => {
            if (res.status === 201) {
                return res;
            }
            return res;
        })
        .catch((err) => {
            console.log('Error: ', err);
            return err;
        })
    }

    const getAllVacancies = async (company_id: string)  => {
        console.log('company_id: ', company_id);
        return await axios.get(`${API_URL}/api/users/get-vacancies`, { params: { company_id } })
        .then((res) => {
            if (res.status === 200) {
                console.log('res: ', res.data);
                return res;
            }
        })
        .catch((err) => {
            console.log('Error: ', err);
            return err;
        })
    }



    const axiosRequest = async (url: string, method: string, data: any) => {
        return await axios({
            method,
            url,
            data,
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
                return res;
            }
            return res;
        })
        .catch((err) => {
            console.log('Error: ', err);
            return err;
        })
    }

    const confirmVacancy = async (vacancy_id: string) => {
        
        let company_id = state.userData.user_id;

        return axiosRequest(`${API_URL}/api/users/confirm-vacancy`, 'patch', { company_id, vacancy_id })
        // .then((res) => {
        //     if (res.status === 200) {
        //         return res;
        //     }
        //     return res;
        // })
        // .catch((err) => {
        //     console.log('Error: ', err);
        //     return err;
        // })
    }

    // End company function

    // User functions
    const getUserData = async (id: string) => {
        setLoading();
        // todo: get user data
    }
    // End user functions
    
    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            userData: state.userData,
            setLoading,
            getRole,
            signIn,
            signOut,
            registerCompany,
            getInitialUserData,
            setUserData,
            getCompanyData,
            getUserData,
            registerVacancy,
            getAllVacancies,
            confirmVacancy,
        }}>
            { children }
        </AuthContext.Provider>
    )

};