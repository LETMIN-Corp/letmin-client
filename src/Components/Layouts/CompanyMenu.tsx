
import Menu from './Menu';

const CompanyMenu : React.FC = () => {
    const menuButtons = [
        {
            text: 'Indicadores',
            path: '/company/indicators',
            isLink: true,
        },
        {
            text: 'Banco de Talentos',
            path: '/company/talents',
            isLink: true,
        },
        {
            text: 'Combinações',
            path: '/company/combinations',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/anything',
            isLink: true,
        },
        {
            text: 'Meus Dados',
            path: '/company/profile',
            isLink: true,
        },
    ];

    return (
        <Menu menuButtons={ menuButtons } showMenu={ true } />
    );
}

export default CompanyMenu;