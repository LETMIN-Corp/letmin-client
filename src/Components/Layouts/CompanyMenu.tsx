
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
            text: 'Inserção de Vagas',
            path: '/company/register/vacancy',
            isLink: true,
        },
        {
            text: 'Combinações',
            path: '/company/combinations',
            isLink: true,
        },
        {
            text: 'Buscar Talentos',
            path: '/company/talent/search',
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