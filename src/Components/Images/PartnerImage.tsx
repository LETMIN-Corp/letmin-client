interface ComponentInterface {
    url: string, 
}

const PartnerImage: React.FC<ComponentInterface> = ({ url }) => {
    return (
        <img src={ url } className='rounded-full m-auto' style={{
            width: '80px',
            height: '80px',
        }} />
    );
}

export default PartnerImage;
