import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <CompanyMenu />
            <div className='w-full mt-20 p-5'>
                { children }
            </div>
        </div>
    );
}

export default CompanyDefault;
