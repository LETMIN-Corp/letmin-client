import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useLoading = () => {
    const { 
        loading,
    } : any = useContext(AuthContext);

    return { 
        loading,
    };
}

export default useLoading;