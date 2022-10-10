import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const {
        getUserData,
        getVacancies,
        getVacancy,
        getCandidateVacancies
        applyVacancy,
        cancelApplyVacancy
        loading
    } : any = useContext(AuthContext);

    return {
        getUserData,
        getVacancies,
        getVacancy,
        getCandidateVacancies
        applyVacancy,
        cancelApplyVacancy
        loading
    };
}

export default useUser;    
