import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getUserData, updateUser, updateUserExperiences, updateUserFormations, getVacancies, getVacancy, applyVacancy, loading } : any = useContext(AuthContext);

    return { getUserData, updateUser, updateUserExperiences, updateUserFormations, getVacancies, getVacancy, applyVacancy, loading };
}

export default useUser;    
