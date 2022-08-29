import AdminMenu from '../../Components/Layouts/AdminMenu';
import Footer from '../../Components/Layouts/Footer';

const AdminDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <AdminMenu />
        <div className='w-full flex flex-col justify-between'>
            <div className='mt-16 md:mt-20'>
                { children }
            </div>
            <Footer />
        </div>
    </div>
    );
}

export default AdminDefault;