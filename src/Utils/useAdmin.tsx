import { useContext } from 'react';

import { AuthContext } from '../Contexts/AuthContextProvider';

const useAdmin = () => {
    const { axiosRequest, API_URL, dispatchError, dispatchSuccess, loading }: any = useContext(AuthContext);

    // Admin functions
    const getAllCompanies = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-companies`, 'GET');
    };
    const getCompany = async (company_id: string) => {
        return await axiosRequest(`${API_URL}/api/admin/get-company/`, 'POST', { company_id });
    };
    const blockCompany = async (company_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/company-block`, 'PATCH', {
            company_id,
        });
    };
    const getAllUsers = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-users`, 'GET');
    };
    const getUser = async (user_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/get-user`, 'POST', { user_id });
    };
    const blockUser = async (user_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/user-block`, 'PATCH', { user_id });
    };
    const getAllComplaints = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-complaints`, 'GET');
    };
    const changeComplaintStatus = async (complaint_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/resolve-complaint`, 'PATCH', {
            complaint_id,
        });
    };
    const removeComplaint = async (complaint_id: string) => {
        return axiosRequest(`${API_URL}/api/admin/remove-complaint`, 'DELETE', {
            complaint_id,
        });
    };

    const getAllLogs = async () => {
        return axiosRequest(`${API_URL}/api/admin/get-all-logs`, 'GET');
    };
    const deleteAllLogs = async () => {
        return axiosRequest(`${API_URL}/api/admin/delete-all-logs`, 'DELETE');
    };

    const getVacancy = async (id: string) => {
        return axiosRequest(`${API_URL}/api/admin/get-vacancy/${id}`, 'GET');
    };
    // End Admin functions

    return {
        blockCompany,
        getAllCompanies,
        getAllUsers,
        blockUser,
        getAllComplaints,
        changeComplaintStatus,
        removeComplaint,
        getUser,
        getCompany,
        getAllLogs,
        deleteAllLogs,
        getVacancy,
        // General functions
        dispatchError,
        dispatchSuccess,
        loading,
    };
};

export default useAdmin;
