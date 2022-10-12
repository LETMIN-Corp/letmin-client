import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ComponentInterface {
    user: {
        name: string;
        email: string;
        _id: string;
    };
}

const TalentBankCard: React.FC<ComponentInterface> = ({ user }) => {
    return (
        <Link to={'/company/combinations/' + user._id}>
            <div className="cursor-pointer break-all text-white bg-primary rounded-sm drop-shadow-lg p-3">
                <div className="text-center font-medium">{user.name}</div>
                <div className="bg-white h-1 rounded-full opacity-50"></div>
                <div className="text-sm">
                    <div className="mt-2 flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                        <span>{user.email}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TalentBankCard;
