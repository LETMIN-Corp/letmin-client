import UserMenu from "../../Components/Layouts/UserMenu";

const UserDefault : React.FC = ({ children }) => {
    return (
        <div className='flex'>
            <UserMenu />
            <div className='w-full mt-16 md:mt-20'>
                { children }
            </div>
        </div>
    );
}

export default UserDefault;