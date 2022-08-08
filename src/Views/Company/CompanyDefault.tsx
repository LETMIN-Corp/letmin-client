import CompanyMenu from '../../Components/Layouts/CompanyMenu';
import Footer from '../../Components/Layouts/Footer';

const CompanyDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <CompanyMenu />
            <div className='w-full flex flex-col justify-between'>
                <div className='mt-16 md:mt-20'>
                    { children }
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default CompanyDefault;