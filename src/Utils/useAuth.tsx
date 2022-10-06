import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAuth = () => {
    const { 
        isAuthenticated,
        userData,
        signOut,
        signIn,
        loading,
        getRole,
        registerCompany,
        setLoading,
        removeLoading,
        dispatchError,
        dispatchSuccess,
        sendRecoveryEmail,
        checkRecoveryToken,
        setNewPassword,
    } : any = useContext(AuthContext);

    return {
        isAuthenticated,
        userData,
        signOut,
        signIn,
        loading,
        getRole,
        registerCompany,
        setLoading,
        removeLoading,
        dispatchError,
        dispatchSuccess,
        sendRecoveryEmail,
        checkRecoveryToken,
        setNewPassword,
    }
}

export default useAuth;    
