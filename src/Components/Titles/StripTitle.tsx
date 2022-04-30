interface ComponentInterface {
    text: string,
}

const StripTitle : React.FC<ComponentInterface> = ({ text }) => {
    return (
        <div className='flex justify-center text-center py-5 lg:py-10 bg-primary'>
            <h1 className='text-white text-4xl md:text-6xl font-black mt-20'>{ text }</h1>
        </div>
    );
}

export default StripTitle;
