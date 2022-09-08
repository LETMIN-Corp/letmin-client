import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useCompany = () => {
    const { getCompanyData } : any = useContext(AuthContext);

    return { getCompanyData };
}

export default useCompany;