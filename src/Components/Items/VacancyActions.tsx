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
                <button><i className='fa-solid fa-check text-xl text-green mr-3'></i></button>
                <button><i className='fa-solid fa-xmark text-xl text-red'></i></button>
            </div>
        </div>
    );
}

export default VacancyData;
