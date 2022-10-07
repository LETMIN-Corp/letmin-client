interface ComponentInterface {
    name: string,
    compatibility: number,
    curriculum: string,
};

import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const CandidateData : React.FC<ComponentInterface> = ({ name, compatibility, curriculum }) => {

    return (
        <div className='flex pt-4 text-sm md:text-md'>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { name }
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { compatibility } %    
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <Link to={ `/company/combinations/${ curriculum }` } className='text-bright-purple'>
                    <FontAwesomeIcon className='text-xl' icon={ faEye } />
                </Link>
            </div>
        </div>
    );
}

export default CandidateData;
