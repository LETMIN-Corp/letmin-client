import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getVacancies, getVacancy, loading } : any = useContext(AuthContext);

    return { getVacancies, getVacancy, loading };
}

export default useUser;    
