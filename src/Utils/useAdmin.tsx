import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies,
        blockCompany,
        getAllUsers,
        blockUser,
        getAllComplaints,
        changeComplaintStatus,
        removeComplaint,
        dispatchError,
        dispatchSuccess,
        loading,
    } : any = useContext(AuthContext);

    return { 
        blockCompany,
        getAllCompanies,
        getAllUsers,
        blockUser,
        getAllComplaints,
        changeComplaintStatus,
        removeComplaint,
        dispatchError,
        dispatchSuccess,
        loading,
    };
}

export default useAdmin;