interface ComponentInterface {
    card : {
        title: string,
    },
}

const TalentBankCard : React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='cursor-pointer bg-primary rounded-sm drop-shadow-lg'>
            <div className='text-center text-white p-3 break-all'>{ card.title }</div>
            <div className='h-52'></div>
        </div>
    );
};

export default TalentBankCard;
