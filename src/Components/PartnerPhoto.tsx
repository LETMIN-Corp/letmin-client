interface PartnerPhotoInterface {
    url: string, 
}

const PartnerPhoto: React.FC<PartnerPhotoInterface> = ({ url }) => {
    return (
        <img src={ url } className="rounded-full m-auto" style={{
            width: "80px",
            height: "80px",
        }} />
    );
}

export default PartnerPhoto;
