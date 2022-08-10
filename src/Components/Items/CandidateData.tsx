interface ComponentInterface {
    name: string,
    compatibility: number,
    curriculum: string,
};

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
                <button className='text-primary font-medium hover:text-bright-purple'>Ver</button>
            </div>
        </div>
    );
}

export default CandidateData;
