import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getVacancies, getVacancy, applyVacancy, loading } : any = useContext(AuthContext);

    return { getVacancies, getVacancy, applyVacancy, loading };
}

export default useUser;    
