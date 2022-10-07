import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getUserData, getVacancies, getVacancy, applyVacancy, cancelApplyVacancy, loading } : any = useContext(AuthContext);

    return { getUserData, getVacancies, getVacancy, applyVacancy, cancelApplyVacancy, loading };
}

export default useUser;    
