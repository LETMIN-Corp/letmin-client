import Menu from '../../Components/Layouts/Menu';

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
            path: '/company/3',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/4',
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
