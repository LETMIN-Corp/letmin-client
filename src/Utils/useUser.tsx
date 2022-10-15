import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const {
        axiosRequest,
        API_URL,
        userData,
        dispatchError,
        dispatchSuccess,
        getCandidateVacancies,
        cancelApplyVacancy,
        formatErrors,
        loading
    } : any = useContext(AuthContext);

    const checkNewFormation = async (data: any) => {
        return await axiosRequest(`${API_URL}/api/user/check-user-formations`, 'POST', data);
    }

    const checkNewExperience = async (data: any) => {
        return await axiosRequest(`${API_URL}/api/user/check-user-experiences`, 'POST', data);
    }

    // User functions
    const getUserData = async () => {
        return await axiosRequest(`${API_URL}/api/user/get-user`, 'GET');
    }
    const getVacancy = async(id: string) => {
        return axiosRequest(`${API_URL}/api/user/get-vacancy/${id}`, 'GET');
    };
    const getVacancies = async () => {
        return await axiosRequest(`${API_URL}/api/user/vacancy`, 'GET');
    };    
    const getCompany = async(id: string) => {
        return axiosRequest(`${API_URL}/api/user/get-company/${id}`, 'GET');
    };
    const getCompanies = async () => {
        return axiosRequest(`${API_URL}/api/user/company`, 'GET');
    };

    const applyVacancy = async (vacancy_id: string) => {
        return await axiosRequest(`${API_URL}/api/user/apply-vacancy`, 'POST', { vacancy_id });
    }

    const updateUser = async (user: any): Promise<any> => {
        return axiosRequest(`${API_URL}/api/user/update-user`, 'POST', user);
    }

    

    return {
        userData,
        getUserData,
        updateUser,
        getVacancies,
        getVacancy,
        getCompany,
        getCandidateVacancies,
        applyVacancy,
        checkNewFormation,
        checkNewExperience,
        getCompanies,
        cancelApplyVacancy,
        dispatchError,
        dispatchSuccess,
        formatErrors,
        loading,
    };
}

export default useUser;    
