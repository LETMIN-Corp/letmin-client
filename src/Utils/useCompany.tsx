import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useCompany = () => {
    const { 
        getCompanyData,
        registerVacancy,
        getAllCompanyVacancies,     
        updateCompanyData,
        updateHolderData,
        userData,
        confirmVacancy,
        closeVacancy,
        dispatchError,
        dispatchSuccess,
        getAllVacancyCandidates,
        getUsers,
        loading,
    } : any = useContext(AuthContext);

    return { 
        getCompanyData,        
        updateCompanyData,
        updateHolderData,
        registerVacancy,
        getAllCompanyVacancies,
        userData,
        confirmVacancy,
        closeVacancy,
        dispatchError,
        dispatchSuccess,
        getAllVacancyCandidates,
        getUsers,
        loading,
    };
}

export default useCompany;