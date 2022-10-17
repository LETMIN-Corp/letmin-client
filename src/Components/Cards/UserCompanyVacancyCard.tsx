import { faAddressBook, faBrazilianRealSign, faClock, faCoins, faDollarSign, faEuroSign, faLocationDot, faMap, faMoneyBill, faTrash, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

interface ComponentInterface {
    vacancy: {    
        role: string;
        sector: string /* No caso da experiência, a instituição é a empresa. */;
        currency: string;
        salary: number;
        region: string;
        description: string;
        _id: string;
    }
}

const UserCompanyVacancyCard: React.FC<ComponentInterface> = ({ vacancy }) => {
    // console.log(vacancy)
    var currency = <FontAwesomeIcon icon={ faMoneyBill } className="mr-1" />;
    if (vacancy.currency == 'Real' )
    {
        currency = <FontAwesomeIcon icon={ faBrazilianRealSign } className="mr-1" />;
    }
    else if (vacancy.currency == 'Dolar' )
    {
        currency = <FontAwesomeIcon icon={ faDollarSign } className="mr-1" />;
    }
    else if (vacancy.currency == 'Euro' )
    {
        currency = <FontAwesomeIcon icon={ faEuroSign } className="mr-1" />;
    }

    return (
        <Link to={`/user/vacancy/detail/${ vacancy._id }`} className='text-black bg-lilac rounded-md flex-col justify-between drop-shadow-lg' >
            <div className="text-white break-all bg-bright-purple p-3 flex justify-between rounded-t-md">
                <div className="font-medium md:mr-0 mr-1">{ vacancy.role }</div> 
                <div className="font-medium">
                    <FontAwesomeIcon className="mr-1" icon={ faAddressBook } />
                    <span>{vacancy.sector}</span>
                </div>
            </div>
            <div className="break-words max-h-40 px-3 pb-3 rounded-md overflow-x-hidden overflow-y-auto h-100">
                <div className="text-dark-purple my-1 flex justify-between">
                    <div>
                        <FontAwesomeIcon icon={ faLocationDot } className="mr-1" />
                        { vacancy.region }
                    </div>
                    <div>
                        { currency }
                        { vacancy.salary }
                    </div>
                </div>
                <div className="text-justify text-sm">{ vacancy.description }</div>

            </div>
        </Link>
    );
};

export default UserCompanyVacancyCard;
