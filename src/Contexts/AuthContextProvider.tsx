import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import ReducerEnum from '../Enums//ReducerEnum';
import { AuthReducer } from '../Reducers/AuthReducer';
import { dispatchError, dispatchSuccess, formatErrors } from '../Utils/ToastMessages';

const API_URL = import.meta.env.VITE_APP_API_URL;

const InitialState: any = {
    loading: false,
    userData: Cookies.get('token') ? jwtDecode(Cookies.get('token')!) : { role: '' },
    isAuthenticated: false,
};

export const AuthContext = createContext(InitialState);

export const AuthState = ({ children }: any) => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(AuthReducer, InitialState);

    const setLoading = () => dispatch({ type: ReducerEnum.set_loading });
    const removeLoading = () => dispatch({ type: ReducerEnum.error });
    const setUserData = (data: any) => dispatch({ type: ReducerEnum.set_user_data, payload: data });
    const getRole = () => {
        const token: string | undefined = Cookies.get('token');

        return token ? jwtDecode<userToken>(token).role : '';
    };

    interface userToken {
        user_id: string;
        sub?: string;
        role: string;
        email: string;
        exp: string;
    }

    // Auth function
    const getInitialUserData = async () => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken: any = jwtDecode(token);
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
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((res) => {
                removeLoading();
                return res;
            })
            .catch((err) => {
                removeLoading();
                return err.response;
            });
    };

    async function signIn(role: string, userCredentials: any): Promise<any> {
        if (!userCredentials) return;
        return await axiosRequest(`${API_URL}/api/${role}/login`, 'POST', userCredentials)
            .then((res: any) => {
                if (res.status === (200 || 201)) {
                    Cookies.set('token', res.headers.authorization);
                    setUserData(res.data);
                    return navigate(`/${role}`);
                }
                if (!res.data) {
                    return dispatchError('Erro de rede: conexão com a API não pôde ser feita');
                }

                dispatchError(formatErrors(res.data.message));
            })
            .catch((err: any) => {
                dispatchError(`Erro no login: ${err}`);
            });
    }

    const registerCompany = async (userCredentials: any): Promise<any> => {
        if (!userCredentials) return;

        return axiosRequest(`${API_URL}/api/company/register`, 'POST', userCredentials).then((res: any) => {
            if (res.data.success && res.status === 201) {
                dispatchSuccess('Empresa cadastrada com sucesso!');

                Cookies.set('token', res.headers.authorization);
                setUserData(res.data);
                return navigate(`/company`);
            }

            dispatchError(formatErrors(res.data.message));
        });
    };

    async function signOut(): Promise<void> {
        Cookies.remove('token');
        dispatch({ type: ReducerEnum.logout });
        navigate('/');
        return Promise.resolve();
    }

    async function deleteAccount(): Promise<void> {
        axiosRequest(`${API_URL}/api/user/delete-account`, 'DELETE')
            .then((res: any) => {
                if (res.status === 200) {
                    signOut();
                    dispatchSuccess(res.data.message);
                    return;
                }
                return dispatchError(formatErrors(res.data.message));
            })
            .catch((err: any) => {
                dispatchError(`Erro ao excluir conta: ${err}`);
            });
    }
    // End auth functions

    useEffect(() => {
        getInitialUserData();
    }, []);

    // Complaint and recover functions
    const createComplaint = async (complaint: any) => {
        return await axiosRequest(`${API_URL}/api/create-complaint`, 'POST', complaint);
    };

    const sendRecoveryEmail = async (email: string) => {
        return axiosRequest(`${API_URL}/api/send-recovery-email`, 'POST', { email });
    };
    const checkRecoveryToken = async (selector: string, token: string) => {
        return axiosRequest(`${API_URL}/api/check-recovery-token`, 'POST', {
            selector,
            token,
        });
    };
    const setNewPassword = async (selector: string, token: string, password: string) => {
        return axiosRequest(`${API_URL}/api/new-password`, 'POST', {
            selector,
            token,
            password,
        });
    };
    // End Complaint and recover functions
    return (
        <AuthContext.Provider
            value={{
                axiosRequest,
                API_URL,
                formatErrors,
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
                deleteAccount,
                registerCompany,
                getInitialUserData,
                setUserData,
                // User functions
                // Company functions
                createComplaint,
                sendRecoveryEmail,
                checkRecoveryToken,
                setNewPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
