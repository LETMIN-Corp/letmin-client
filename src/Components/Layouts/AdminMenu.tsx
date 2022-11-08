import Menu from '../../Components/Layouts/Menu';

const AdminMenu: React.FC = () => {
    const menuButtons = [
        {
            text: 'Empresas',
            path: '/admin/companies',
            isLink: true,
        },
        {
            text: 'Colaboradores',
            path: '/admin/collaborators',
            isLink: true,
        },
        {
            text: 'Denúncias',
            path: '/admin/complaints',
            isLink: true,
        },
        {
            text: 'Logs',
            path: '/admin/logs',
            isLink: true,
        },
    ];

    return <Menu menuButtons={menuButtons} showMenu={true} />;
};

export default AdminMenu;
