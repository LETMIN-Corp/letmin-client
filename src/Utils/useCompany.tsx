import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useCompany = () => {
    const { getCompanyData, registerVacancy, getAllVacancies, userData, confirmVacancy } : any = useContext(AuthContext);

    return { getCompanyData, registerVacancy, getAllVacancies, userData, confirmVacancy };
}

export default useCompany;   