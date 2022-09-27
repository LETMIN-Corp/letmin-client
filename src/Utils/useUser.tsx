import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getUserData, updateUser, getVacancies, getVacancy, applyVacancy, loading } : any = useContext(AuthContext);

    return { getUserData, updateUser, getVacancies, getVacancy, applyVacancy, loading };
}

export default useUser;    
