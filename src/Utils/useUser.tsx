import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getVacancies, loading } : any = useContext(AuthContext);

    return { getVacancies, loading };
}

export default useUser;    
