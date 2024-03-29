import { faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ComponentInterface {
    card: {
        name?: string;
        institution?: string;
        role?: string;
        company?: string /* No caso da experiência, a instituição é a empresa. */;
        start: string;
        finish: string;
        description: string;
    };
}

const CompanyCandidateCard: React.FC<ComponentInterface> = ({ card }) => {
    return (
        <div className={'text-black bg-lilac rounded-md flex-col justify-between drop-shadow-lg'}>
            <div className="text-white break-all bg-bright-purple p-3 flex justify-between rounded-t-md">
                <div className="font-medium">{card.name || card.role}</div>
                <div className="font-medium">{card.institution || card.company}</div>
            </div>
            <div className="break-words max-h-40 px-3 pb-3 rounded-md overflow-x-hidden overflow-y-auto h-100">
                <div className="text-dark-purple my-1 flex items-center">
                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                    {card.start.slice(0, 4)} - {card.finish.slice(0, 4)}
                </div>
                <div className="text-justify text-sm">{card.description}</div>
            </div>
        </div>
    );
};

export default CompanyCandidateCard;
