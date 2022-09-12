import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useCompany = () => {
    const { 
        getCompanyData,
        registerVacancy,
        getAllCompanyVacancies,
        userData,
        confirmVacancy,
        closeVacancy,
    } : any = useContext(AuthContext);

    return { 
        getCompanyData,
        registerVacancy,
        getAllCompanyVacancies,
        userData,
        confirmVacancy,
        closeVacancy,
    };
}

export default useCompany;