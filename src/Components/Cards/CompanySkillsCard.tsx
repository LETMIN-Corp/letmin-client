import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ComponentInterface {
    card: {
        name: string;
        level: string;
    };
    canExclude?: boolean;
    exclude?: () => void;
}

const CompanySkillCard: React.FC<ComponentInterface> = ({ card, canExclude, exclude }) => {
    return (
        <div
            className={
                `text-black bg-lilac rounded-md flex-col justify-between drop-shadow-lg` +
                (canExclude ? ' animate-[wiggle_1.5s_ease-in-out_infinite] hover:cursor-pointer' : '')
            }
            onClick={exclude}
        >
            <div className="text-white break-all text-sm bg-bright-purple p-3 flex justify-between rounded">
                <div className="font-medium">
                    {card.name} - {card.level}
                </div>
            </div>
        </div>
    );
};

export default CompanySkillCard;
