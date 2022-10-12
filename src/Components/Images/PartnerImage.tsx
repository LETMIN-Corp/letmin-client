interface ComponentInterface {
    url: string;
}

const PartnerImage: React.FC<ComponentInterface> = ({ url }) => {
    return (
        <img
            src={url}
            className="m-auto"
            style={{
                width: '50px',
                height: '50px',
            }}
            alt="Logo da empresa"
        />
    );
};

export default PartnerImage;
