import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

import SecondaryLink from '../../Components/Links/SecondaryLink';
import UserDefault from './UserDefault';

const UserError: React.FC = () => {
    useEffect((): void => {
        window.document.title = 'Letmin - 404';
    }, []);

    return (
        <UserDefault>
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <div>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-9xl text-black" />
                </div>
                <h1 className="text-xl font-bold text-center px-10 my-10 text-black">404 - Página Não Encontrada</h1>
                <div>
                    <SecondaryLink path="/user/profile" text="Voltar"></SecondaryLink>
                </div>
            </div>
        </UserDefault>
    );
};

export default UserError;
