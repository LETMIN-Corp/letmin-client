import { Link } from "react-router-dom";
import SecondaryButton from "../Buttons/SecondaryButton";
import SecondaryLink from "../Links/SecondaryLink";

interface ComponentInterface {
    name: string,
    compatibility: number,
    curriculum: string,
};

const CandidateData : React.FC<ComponentInterface> = ({ name, compatibility, curriculum }) => {

    return (
        <div className='flex md:text-xl text-md font-medium pt-4'>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { name }
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                { compatibility } %    
            </div>
            <div className='w-4/12 flex justify-center items-center text-center'>
                <SecondaryLink path={ curriculum } text='Ver'></SecondaryLink>
            </div>
        </div>
    );
}

export default CandidateData;
