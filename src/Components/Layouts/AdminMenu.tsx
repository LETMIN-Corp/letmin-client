import Menu from '../../Components/Layouts/Menu';

const AdminMenu : React.FC = () => {
    const menuButtons = [
        {
            text: 'Empresas',
            path: '/admin/company',
            isLink: true,
        },
        {
            text: 'Colaboradores',
            path: '/admin/collaborator',
            isLink: true,
        },
        {
            text: 'Denúncias',
            path: '/admin/complaint',
            isLink: true,
        },
    ];

    return (
        <Menu menuButtons={ menuButtons } showMenu={ true } />
    );
}

export default AdminMenu;
