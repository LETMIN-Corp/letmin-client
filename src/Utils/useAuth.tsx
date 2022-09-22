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
        dispatchError
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
        dispatchError
    }
}

export default useAuth;    
