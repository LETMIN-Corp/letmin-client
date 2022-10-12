import Menu from '../../Components/Layouts/Menu';

const UserMenu: React.FC = () => {
    const menuButtons = [
        {
            text: 'Perfil',
            path: '/user/profile',
            isLink: true,
        },
        {
            text: 'Candidaturas',
            path: '/user/combinations',
            isLink: true,
        },
        {
            text: 'Buscar Vagas',
            path: '/user/vacancy/search',
            isLink: true,
        },
    ];

    return <Menu menuButtons={menuButtons} showMenu={true} />;
};

export default UserMenu;
