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
        addToTalentBank,
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
        addToTalentBank,
        loading,
    };
}

export default useCompany;