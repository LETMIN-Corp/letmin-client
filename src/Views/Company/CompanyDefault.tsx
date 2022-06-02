import CompanyMenu from '../../Components/Layouts/CompanyMenu';

const CompanyDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <CompanyMenu />
            <div className='w-full mt-16'>
                { children }
            </div>
        </div>
    );
}

export default CompanyDefault;