import { Link } from "react-router-dom";
import FormButton from "../Buttons/FormButton";
import SecondaryButton from "../Buttons/SecondaryButton";

interface ComponentInterface {
    name: string,
    candidates: number,
};

const VacancyData : React.FC<ComponentInterface> = ({ name, candidates }) => {

    return (
        <div className='flex md:text-xl text-md font-medium pt-2'>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { name }
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <Link to='../company/vacancy/data'>{ candidates }</Link>                
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <button><i className='fa-solid fa-check text-3xl text-green mr-3'></i></button>
                <button><i className='fa-solid fa-xmark text-3xl text-red'></i></button>
            </div>
        </div>
    );
}

export default VacancyData;
