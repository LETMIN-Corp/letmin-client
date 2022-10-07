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
        getCandidate,
        getAllVacancyCandidates,
        createComplaint,
        getUsers,
        addToTalentBank,
        removeFromTalentBank,
        getTalentBank,
        loading,
        getCompanyVacancy,
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
        getCandidate,
        getAllVacancyCandidates,
        createComplaint,
        getUsers,
        addToTalentBank,
        removeFromTalentBank,
        getTalentBank,
        loading,
        getCompanyVacancy,
    };
}

export default useCompany;