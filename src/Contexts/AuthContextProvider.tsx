import { useEffect, useReducer, createContext } from 'react';
import { AuthReducer } from "../Reducers/AuthReducer";
import ReducerEnum from "../Enums//ReducerEnum";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

const InitialState : any = {
    loading: true,
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

    const setLoading = () => dispatch({ type: ReducerEnum.set_loading, payload: undefined });
    const removeLoading = () => dispatch({ type: ReducerEnum.error });
    const setUserData = (data:any) => dispatch({ type: ReducerEnum.set_user_data, payload: data });
    const getRole = () => {
        // @ts-ignore:next-line
        return (Cookies.get('token') ? jwtDecode(Cookies.get('token').toString()).role : '');
    }

    function dispatchError(text : string) {
        toast.error(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function dispatchSuccess(text : string) {
        toast.success(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
            return err.response;
        })
    }

    async function signIn(role: string, userCredentials: any): Promise<any> {
        if (!userCredentials) return;

        return await axiosRequest(`${API_URL}/api/users/login-${role}`, 'POST', userCredentials)
        .then((res: any) => {
            if (res.status === 200) {
                Cookies.set('token', res.headers.authorization);
                setUserData(res.data);
                return navigate(`/${role}`);
            }
            if (res.status === 400) {
                dispatchError('Usuário não encontrado');
            }
            if (res.status === 401) {
                dispatchError('Usuário ou senha incorretos');
            }
            return res;
        })  
    }

    const registerCompany = async (userCredentials: any): Promise<any> => {
        if (!userCredentials) return;

        setLoading();

        return axiosRequest(`${API_URL}/api/users/register-company`, userCredentials);
        return axiosRequest(`${API_URL}/api/users/register-company`, 'POST', userCredentials);
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
        return await axiosRequest(`${API_URL}/api/users/company-data`, 'GET');
    }
    const registerVacancy = async (vacancy: any) => {
        return await axiosRequest(`${API_URL}/api/users/register-vacancy`, 'POST', vacancy);
    }

    const getAllCompanyVacancies = async ()  => {
        return await axiosRequest(`${API_URL}/api/users/get-all-vacancies`, 'GET');
    }

    const confirmVacancy = async (vacancy_id: string) => {
        let company_id = state.userData.user_id;
        return axiosRequest(`${API_URL}/api/users/confirm-vacancy/${vacancy_id}`, 'patch', { company_id,  })
        return axiosRequest(`${API_URL}/api/users/confirm-vacancy/${vacancy_id}`, 'PATCH', { company_id,  })
    }

    const closeVacancy = async (vacancy_id: string) => {
        let company_id = state.userData.user_id;
        return axiosRequest(`${API_URL}/api/users/close-vacancy/${vacancy_id}`, 'delete', { company_id })
        return axiosRequest(`${API_URL}/api/users/close-vacancy/${vacancy_id}`, 'DELETE', { company_id })
    }
    // End company function

    // User functions
    const getUserData = async (id: string) => {
        setLoading();
        // todo: get user data
    }

    const getVacancies = async () => {
        return await axiosRequest(`${API_URL}/api/users/vacancy`, 'GET');
    }
    // End user functions
    
    // Admin functions
    const getAllCompanies = async () => {
        return axiosRequest(`${API_URL}/api/users/get-all-companies`, 'GET');
    }
    const blockCompany = async (company_id: string) => {
        return axiosRequest(`${API_URL}/api/users/company-block`, 'PATCH', { company_id });
    }
    const getAllUsers = async () => {
        return axiosRequest(`${API_URL}/api/users/get-all-users`, 'GET');
    }
    const blockUser = async (user_id: string) => {
        return axiosRequest(`${API_URL}/api/users/user-block`, 'patch', { user_id });
        return axiosRequest(`${API_URL}/api/users/user-block`, 'PATCH', { user_id });
    }
    // End Admin functions
    return (
        <AuthContext.Provider value={{
            loading: state.loading,
            isAuthenticated: state.isAuthenticated,
            userData: state.userData,
            dispatchError,
            dispatchSuccess,
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
            getAllCompanyVacancies,
            confirmVacancy,
            closeVacancy,
            getVacancies,
            //Admin
            getAllCompanies,
            blockCompany,
            getAllUsers,
            blockUser,
        }}>
            { children }
        </AuthContext.Provider>
    )

};