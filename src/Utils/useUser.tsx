import { useContext } from 'react';

import { AuthContext } from '../Contexts/AuthContextProvider';

const useUser = () => {
    const {
        axiosRequest,
        API_URL,
        userData,
        deleteAccount,
        dispatchError,
        dispatchSuccess,
        formatErrors,
        loading,
    }: any = useContext(AuthContext);

    const checkNewSkill = async (skill: any) => {
        return await axiosRequest(`${API_URL}/api/user/check-user-skills`, 'POST', skill);
    };

    const checkNewFormation = async (formation: any) => {
        return await axiosRequest(`${API_URL}/api/user/check-user-formations`, 'POST', formation);
    };

    const checkNewExperience = async (formation: any) => {
        return await axiosRequest(`${API_URL}/api/user/check-user-experiences`, 'POST', formation);
    };

    // User functions
    const getUserData = async () => {
        return await axiosRequest(`${API_URL}/api/user/get-user`, 'GET');
    };
    const getVacancy = async (id: string) => {
        return axiosRequest(`${API_URL}/api/user/get-vacancy/${id}`, 'GET');
    };
    const getVacancies = async () => {
        return await axiosRequest(`${API_URL}/api/user/vacancy`, 'GET');
    };
    const getCompany = async (id: string) => {
        return axiosRequest(`${API_URL}/api/user/get-company/${id}`, 'GET');
    };
    const getCompanies = async () => {
        return axiosRequest(`${API_URL}/api/user/company`, 'GET');
    };

    const applyVacancy = async (vacancy_id: string) => {
        return await axiosRequest(`${API_URL}/api/user/apply-vacancy`, 'POST', {
            vacancy_id,
        });
    };

    const updateUser = async (user: any): Promise<any> => {
        return axiosRequest(`${API_URL}/api/user/update-user`, 'POST', user);
    };

    const getCandidateVacancies = async () => {
        return axiosRequest(`${API_URL}/api/user/get-candidate-applications`, 'GET');
    };

    const cancelApplyVacancy = async (vacancy_id: string) => {
        return axiosRequest(`${API_URL}/api/user/cancel-apply-vacancy`, 'POST', {
            vacancy_id,
        });
    };

    return {
        userData,
        deleteAccount,
        getUserData,
        updateUser,
        getVacancies,
        getVacancy,
        getCompany,
        getCandidateVacancies,
        applyVacancy,
        checkNewSkill,
        checkNewFormation,
        checkNewExperience,
        getCompanies,
        cancelApplyVacancy,
        dispatchError,
        dispatchSuccess,
        formatErrors,
        loading,
    };
};

export default useUser;
