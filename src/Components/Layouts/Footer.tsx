const Footer : React.FC = () => {
    return (
        <>
            <div className='h-32 md:h-20'></div>
            <footer className='absolute w-full bottom-0 bg-primary font-medium text-white flex justify-between items-center py-3 px-5 md:px-20 flex-col-reverse md:flex-row'>
                <div className='text-sm my-3 md:text-base'>
                    &copy; 2022 - Letmin Corporation
                </div>
                
                <div className='text-center text-sm md:text-base'>
                    <div>Contato:</div>
                    <a href='mailto:letmin.corp@gmail.com'>letmin.corp@gmail.com</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;
