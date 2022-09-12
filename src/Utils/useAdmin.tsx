import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies
    } : any = useContext(AuthContext);

    return { 
        getAllCompanies
    };
}

export default useAdmin;