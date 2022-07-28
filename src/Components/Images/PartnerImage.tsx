import { ReactNode } from "react";

interface ComponentInterface {
    url: ReactNode, 
}

const PartnerImage: React.FC<ComponentInterface> = ({ url }) => {
    return (
        // @ts-ignore:next-line
        <img src={ url } className='m-auto' style={{
            width: '50px',
            height: '50px',
        }} />
    );
}

export default PartnerImage;

