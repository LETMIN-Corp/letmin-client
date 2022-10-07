import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ComponentInterface {
    vacancy : {
        _id: string,
        candidates: Array<any>,
        role: string,
        company: {
            company: {
                name: string,
            }
        }
        sector: string,
        region: string,
        description: string,
    },
    user_id: string,
    handleClick: () => void,
}

const CombinationData : React.FC<ComponentInterface> = ({ vacancy, user_id, handleClick }) => {

    return (
        
        <div>
            {
                (vacancy.candidates.includes(user_id)) && (
                    <>
                    <div className='flex pt-2 text-sm md:text-md'>
                        <div className='w-4/12 flex justify-center items-center text-center'>
                            { vacancy.role }
                        </div>
                        <div className='w-4/12 flex justify-center items-center text-center'>
                            { vacancy.sector }                
                        </div>
                        <div className='w-4/12 flex justify-center items-center text-center'>
                            <Link to={`/user/vacancy/detail/${ vacancy._id }`} className='text-primary font-medium hover:text-bright-purple' title="Ver Vaga"><FontAwesomeIcon icon={ faEye}/></Link>
                        </div>
                    </div>
                    </>
                )
            }
            
        </div>
    );
}

export default CombinationData;
