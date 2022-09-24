import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getUserData, getVacancies, getVacancy, loading } : any = useContext(AuthContext);

    return { getUserData, getVacancies, getVacancy, loading };
}

export default useUser;    
