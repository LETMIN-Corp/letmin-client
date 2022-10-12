interface ComponentInterface {
    children: React.ReactNode;
}

const CompanyEditCard: React.FC<ComponentInterface> = ({ children }) => {
    return <div className="drop-shadow-md bg-white p-3 my-5">{children}</div>;
};

export default CompanyEditCard;
