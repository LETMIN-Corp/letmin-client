import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface ComponentInterface {
    name: string,
    candidates: number,
};

const VacancyData : React.FC<ComponentInterface> = ({ name, candidates }) => {

    return (
        <div className='flex pt-2 text-sm md:text-md'>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { name }
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <Link to='../company/vacancy/data' className="text-primary font-medium hover:text-bright-purple">{ candidates }</Link>                
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <button><FontAwesomeIcon icon={ faCheck } className='text-xl text-green mr-3'></FontAwesomeIcon></button>
                <button><FontAwesomeIcon icon={ faXmark } className='text-xl text-red'></FontAwesomeIcon></button>
            </div>
        </div>
    );
}

export default VacancyData;
