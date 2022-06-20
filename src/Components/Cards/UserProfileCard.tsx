interface ComponentInterface {
    card : {
        name: string,
        time: string,
    },
}


const UserProfileCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className='text-white bg-bright-purple p-3 rounded-md flex justify-between'>
            <div className='font-medium'>{ card.name }</div>
            <div>{ card.time }</div>
        </div>
    );
}

export default UserProfileCard;
