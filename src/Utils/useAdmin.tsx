import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies,
        blockCompany,
        getAllUsers,
        blockUser,
        loading,
    } : any = useContext(AuthContext);

    return { 
        blockCompany,
        getAllCompanies,
        getAllUsers,
        blockUser,
        loading,
    };
}

export default useAdmin;