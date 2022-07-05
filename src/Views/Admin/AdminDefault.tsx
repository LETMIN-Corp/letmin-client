import AdminMenu from '../../Components/Layouts/AdminMenu';

const AdminDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <AdminMenu />
            <div className='w-full mt-16 md:mt-20'>
                { children }
            </div>
        </div>
    );
}

export default AdminDefault;