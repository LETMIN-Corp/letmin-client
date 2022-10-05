import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAdmin = () => {
    const { 
        getAllCompanies,
        blockCompany,
        getAllUsers,
        blockUser,
        createComplaint,
        getAllComplaints,
        changeComplaintStatus,
        removeComplaint,
        getUser,
        dispatchError,
        dispatchSuccess,
        loading,
    } : any = useContext(AuthContext);

    return { 
        blockCompany,
        getAllCompanies,
        getAllUsers,
        blockUser,
        createComplaint,
        getAllComplaints,
        changeComplaintStatus,
        removeComplaint,
        getUser,
        dispatchError,
        dispatchSuccess,
        loading,
    };
}

export default useAdmin;