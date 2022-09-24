import { useEffect, useReducer, createContext } from 'react';
import { AuthReducer } from "../Reducers/AuthReducer";
import ReducerEnum from "../Enums//ReducerEnum";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { dispatchError, dispatchSuccess, formatErrors } from '../Utils/ToastMessages';

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

    const setLoading = () => dispatch({ type: ReducerEnum.set_loading });
    const removeLoading = () => dispatch({ type: ReducerEnum.error });
    const setUserData = (data:any) => dispatch({ type: ReducerEnum.set_user_data, payload: data });
    const getRole = () => {
        // @ts-ignore:next-line
        return (Cookies.get('token') ? jwtDecode(Cookies.get('token').toString()).role : '');
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

    const axiosRequest = async (url: string, method: string, data: any = null) => {
        setLoading();
        return await axios({
            method,
            url,
            data,
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then((res) => {
            removeLoading();
            return res;
        })
        .catch((err) => {
            removeLoading();
            return err.response;
        })
    }

    async function signIn(role: string, userCredentials: any): Promise<any> {
        if (!userCredentials) return;
        return await axiosRequest(`${API_URL}/api/${role}/login`, 'POST', userCredentials)
        .then((res: any) => {
            if (res.status === (200 || 201)) {
                Cookies.set('token', res.headers.authorization);
                setUserData(res.data);
                return navigate(`/${role}`);
            }       

            dispatchError(formatErrors(res.data.message));
        }).catch((err: any) => {
            dispatchError(`Erro no login: ${err}`);
        });
    }

    const registerCompany = async (userCredentials: any): Promise<any> => {
        if (!userCredentials) return;

        return axiosRequest(`${API_URL}/api/company/register`, 'POST', userCredentials)
        .then((res: any) => {
            if (res.data.success && res.status === 201) {
                dispatchSuccess('Empresa cadastrada com sucesso!');

                Cookies.set('token', res.headers.authorization);
                setUserData(res.data);
                return navigate(`/company`);
            }

            dispatchError(formatErrors(res.data.message));
        });
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

    const getCompanyData = async () => {
        return await axiosRequest(`${API_URL}/api/company/company-data`, 'GET');
    }
    const registerVacancy = async (vacancy: any) => {
        return await axiosRequest(`${API_URL}/api/company/register-vacancy`, 'POST', vacancy);
    }

    const getAllCompanyVacancies = async ()  => {
        return await axiosRequest(`${API_URL}/api/company/get-all-vacancies`, 'GET');
    }

    const confirmVacancy = async (vacancy_id: string) => {
        let company_id = state.userData.user_id;
        return axiosRequest(`${API_URL}/api/company/confirm-vacancy/${vacancy_id}`, 'PATCH', { company_id,  })
    }

    const closeVacancy = async (vacancy_id: string) => {
        let company_id = state.userData.user_id;
        return axiosRequest(`${API_URL}/api/company/close-vacancy/${vacancy_id}`, 'DELETE', { company_id })
    }
    // End company function

    // User functions
    const getUserData = async () => {
        return await axiosRequest(`${API_URL}/api/user/get-user`, 'GET');
    }
    const getVacancy = async(id: string) => {
        return axiosRequest(`${API_URL}/api/user/get-vacancy/${id}`, 'GET');
    };
    const getVacancies = async () => {
        return await axiosRequest(`${API_URL}/api/user/vacancy`, 'GET');
    }
    // End user functions
    
    // Admin functions
    const getAllCompanies = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-companies`, 'GET');
    }
    const blockCompany = async (company_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/company-block`, 'PATCH', { company_id });
    }
    const getAllUsers = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-users`, 'GET');
    }
    const blockUser = async (user_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/user-block`, 'PATCH', { user_id });
    }
    // End Admin functions
    return (
        <AuthContext.Provider value={{
            // Auth functions
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            userData: state.userData,
            dispatchError,
            dispatchSuccess,
            setLoading,
            removeLoading,
            getRole,
            signIn,
            signOut,
            registerCompany,
            getInitialUserData,
            setUserData,
            // User functions
            getUserData,
            getVacancy,
            getVacancies,
            // Company functions
            getCompanyData,
            registerVacancy,
            getAllCompanyVacancies,
            confirmVacancy,
            closeVacancy,
            // Admin functions
            getAllCompanies,
            blockCompany,
            getAllUsers,
            blockUser,
        }}>
            { children }
        </AuthContext.Provider>
    )

};