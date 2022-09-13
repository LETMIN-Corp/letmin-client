import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies,
        blockCompany,
        getAllUsers,
        blockUser,
    } : any = useContext(AuthContext);

    return { 
        blockCompany,
        getAllCompanies,
        getAllUsers,
        blockUser,
    };
}

export default useAdmin;