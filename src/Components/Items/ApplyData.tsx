import { faEye, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ComponentInterface {
    vacancy: {
        _id: string;
        candidates: Array<any>;
        role: string;
        company: {
            _id: string;
            name: string;
        };
        sector: string;
        region: string;
        description: string;
        closed: boolean;
    };
    user_id: string;
}

const ApplyData: React.FC<ComponentInterface> = ({ vacancy, user_id }) => {
    return (
        <div>
            {
                <div className={`flex py-1 text-sm md:text-md ${ vacancy.closed ? 'bg-red-light' : ''}`}>
                    <div className="w-4/12 flex justify-center items-center text-center">{vacancy.role}</div>
                    <div className="w-4/12 flex justify-center items-center text-center">{vacancy.company.name}</div>
                    <div className="w-4/12 flex justify-center items-center text-center">
                    {
                        (!vacancy.closed) && (
                            <Link
                                to={`/user/vacancy/detail/${vacancy._id}`}
                                className="text-primary font-medium hover:text-bright-purple"
                                title="Ver Vaga"
                            >
                                <FontAwesomeIcon icon={faEye} className="text-lg" />
                            </Link>
                        )
                    }
                    {
                        (vacancy.closed) && (
                            <FontAwesomeIcon icon={faLock} className="text-lg text-red" title="Vaga Fechada"/>
                        )
                    }
                    </div>
                </div>
            }
        </div>
    );
};

export default ApplyData;
