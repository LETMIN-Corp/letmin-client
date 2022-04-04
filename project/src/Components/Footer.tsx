function Footer () {
    return (
        <footer className="bg-primary text-white flex justify-between items-center py-4 px-5 md:px-20 flex-col-reverse md:flex-row">
            <div className="text-sm my-3 md:text-base">
                &copy; 2022 - Letmin Corporation
            </div>
            <div className="text-center text-sm md:text-base">
                <div>Contato:</div>
                <a href="mailto:letmin.corp@gmail.com">letmin.corp@gmail.com</a>
            </div>
        </footer>
    );
}

export default Footer;
