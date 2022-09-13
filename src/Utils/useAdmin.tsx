import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies,
        blockCompany,
    } : any = useContext(AuthContext);

    return { 
        blockCompany,
        getAllCompanies,
    };
}

export default useAdmin;