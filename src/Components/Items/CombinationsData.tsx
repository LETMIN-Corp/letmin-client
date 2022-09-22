import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ComponentInterface {
    name: string,
    vacancy: string,
    handleClick: () => void,
};

const CombinationData : React.FC<ComponentInterface> = ({ name, vacancy, handleClick }) => {

    return (
        <div className='flex pt-2 text-sm md:text-md'>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { name }
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { vacancy }                
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <button 
                onClick={ handleClick }
                className='text-red font-medium mr-5' 
                title='Remover'><FontAwesomeIcon icon={ faTrash }/></button>
                {/* <ConfimationModal></ConfimationModal> */}
                <Link to='/user/vacancy/detail' className='text-primary font-medium hover:text-bright-purple' title="Ver Vaga"><FontAwesomeIcon icon={ faEye}/></Link>
            </div>
        </div>
    );
}

export default CombinationData;
