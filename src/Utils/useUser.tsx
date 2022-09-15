import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useUser = () => {
    const { getVacancies } : any = useContext(AuthContext);

    return { getVacancies };
}

export default useUser;    
