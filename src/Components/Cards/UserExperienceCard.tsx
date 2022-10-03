import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ComponentInterface {
    card : {
        name?: string,
        institution?: string,  
        role?: string,
        company?: string,    /* No caso da experiência, a instituição é a empresa. */
        start: string,
        finish: string,
        description: string,
    },
    exclude ?: boolean,
}


const UserExperienceCard: React.FC<ComponentInterface> = ({ card, exclude }) => {
    return (
        <div className='text-black bg-slate-200 rounded-md flex-col justify-between border-2'>
            <div className='text-white bg-bright-purple p-3 flex justify-between'>
                <div className='font-medium'>{ card.name || card.role }</div>
                <div className='font-medium'>{ card.institution || card.company }</div>
                
                {
                    (exclude) && (
                        <div className='font-medium'> <FontAwesomeIcon icon={ faTrash } /></div>  
                    )
                }
                          
            </div>
            <div className='break-words max-h-40 px-3 pb-3 rounded-md overflow-x-hidden overflow-y-auto h-100'>
                <p>{ card.start.slice(0,4) } - {card.finish.slice(0,4)}</p>
                { card.description}
            </div>
        </div>
    );
}

export default UserExperienceCard;