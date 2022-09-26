interface ComponentInterface {
    name: string,
    compatibility: number,
    curriculum: string,
};

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
                <Link to={ `/profile/${curriculum}` } className='text-bright-purple'>Ver Currículo</Link>
            </div>
        </div>
    );
}

export default CandidateData;
