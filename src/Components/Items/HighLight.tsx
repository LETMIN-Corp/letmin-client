interface ComponentInterface {
    children: React.ReactNode;
}

const HighLight: React.FC<ComponentInterface> = ({ children }) => {
    return <b className="text-primary">{children}</b>;
};

export default HighLight;
