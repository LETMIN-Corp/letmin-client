import { useContext } from 'react';

import { AuthContext } from '../Contexts/AuthContextProvider';

const useCompany = () => {
    const {
        axiosRequest,
        API_URL,
        userData,
        createComplaint,
        formatErrors,
        dispatchError,
        dispatchSuccess,
        loading,
    }: any = useContext(AuthContext);

    // Company Functions
    const registerVacancy = async (vacancy: any) => {
        return await axiosRequest(
            `${API_URL}/api/company/register-vacancy`,
            'POST',
            vacancy,
        );
    };
    const confirmVacancy = async (vacancy_id: string) => {
        return axiosRequest(
            `${API_URL}/api/company/confirm-vacancy/${vacancy_id}`,
            'PATCH',
        );
    };
    const closeVacancy = async (vacancy_id: string) => {
        return axiosRequest(
            `${API_URL}/api/company/close-vacancy/${vacancy_id}`,
            'DELETE',
        );
    };
    const getCompanyData = async () => {
        return await axiosRequest(`${API_URL}/api/company/company-data`, 'GET');
    };
    const getAllCompanyVacancies = async () => {
        return await axiosRequest(`${API_URL}/api/company/get-all-vacancies`, 'GET');
    };
    const getCompanyVacancy = async (id: string) => {
        return await axiosRequest(`${API_URL}/api/company/get-vacancy/${id}`, 'GET');
    };

    const getCandidate = async (candidate_id: string) => {
        return await axiosRequest(
            `${API_URL}/api/company/get-candidate/${candidate_id}`,
            'GET',
        );
    };
    const getAllVacancyCandidates = async (vacancy_id: string) => {
        return axiosRequest(
            `${API_URL}/api/company/get-all-candidates/${vacancy_id}`,
            'GET',
        );
    };

    const getUsers = async () => {
        return await axiosRequest(`${API_URL}/api/company/user`, 'GET');
    };

    const updateCompanyData = async (company: any): Promise<any> => {
        return axiosRequest(
            `${API_URL}/api/company/update-company-company`,
            'POST',
            company,
        );
    };
    const updateHolderData = async (company: any): Promise<any> => {
        return axiosRequest(
            `${API_URL}/api/company/update-company-holder`,
            'POST',
            company,
        );
    };

    const addToTalentBank = async (target: any) => {
        return axiosRequest(`${API_URL}/api/company/add-to-talent-bank`, 'POST', {
            target,
        });
    };
    const getTalentBank = async () => {
        return await axiosRequest(`${API_URL}/api/company/get-talent-bank`, 'GET');
    };
    const removeFromTalentBank = async (target: any) => {
        return axiosRequest(`${API_URL}/api/company/remove-from-talent-bank`, 'POST', {
            target,
        }).then((res: any) => {
            if (res.data.success && res.status === 200) {
                dispatchSuccess(res.data.message);
            } else {
                dispatchError(formatErrors(res.data.message));
            }
        });
    };

    const updateVacancy = async (vacancy: any) => {
        return axiosRequest(`${API_URL}/api/company/update-vacancy`, 'PATCH', vacancy);
    };

    return {
        userData,
        getCompanyData,
        updateCompanyData,
        updateHolderData,
        registerVacancy,
        getAllCompanyVacancies,
        confirmVacancy,
        closeVacancy,
        getCandidate,
        getAllVacancyCandidates,
        getUsers,
        addToTalentBank,
        removeFromTalentBank,
        getTalentBank,
        createComplaint,
        formatErrors,
        dispatchError,
        dispatchSuccess,
        loading,
        getCompanyVacancy,
        updateVacancy,
    };
};

export default useCompany;
