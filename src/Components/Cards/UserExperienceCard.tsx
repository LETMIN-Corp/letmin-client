interface ComponentInterface {
    card : {
        name: string,
        institution: string,    /* No caso da experiência, a instituição é a empresa. */
        timeStart: string,
        timeFinish: string,
        description: string,
    },
}


const UserExperienceCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='text-black bg-slate-200 rounded-md flex-col justify-between border-2'>
            <div className='text-white bg-bright-purple p-3 flex justify-between'>
                <div className='font-medium'>{ card.name }</div>
                <div className='font-medium'>{ card.institution }</div>
            </div>
            <div className=' p-2 pl-3 rounded-md flex justify-between'>
                { card.timeStart } - {card.timeFinish}
            </div>
            <div className='break-words max-h-20 px-3 pb-3 rounded-md justify-between overflow-x-hidden overflow-y-auto'>
                { card.description}
            </div>
        </div>
    );
}

export default UserExperienceCard;