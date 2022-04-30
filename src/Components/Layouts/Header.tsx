import LogoImage from "../../Assets/logo.svg";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PrimaryLink from "../Links/PrimaryLink";

interface ButtonsInterface {
    text: string,
    path: string,
    isLink: boolean,
}

interface PageButtonsInterface {
    [key: string] : Array<ButtonsInterface>
}


const Header : React.FC = () => {
    const pagePath : string  = useLocation().pathname;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const pageButtons : PageButtonsInterface = {
        "/" : [
            {
                text: "Diferencial",
                path: "#differential",
                isLink: false,
            },
            {
                text: "Sobre",
                path: "#about",
                isLink: false,
            },
            {
                text: "Quem somos",
                path: "#who-we-are",
                isLink: false,
            },
            {
                text: "Cadastre-se",
                path: "/register",
                isLink: true,
            },
        ],
        "/register" : [
            {
                text: "Home",
                path: "/",
                isLink: true,
            },
        ],
        "/register/company" : [
            {
                text: "Voltar para o cadastro",
                path: "/register",
                isLink: true,
            }
        ],
    };

    return (
        <header className="fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg">
            <a href="#main">
                <img src={ LogoImage } className="w-12 md:w-16" />
            </a>
            <div>
                <i onClick={ () => setMenuIsOpen(true) } className="fa-solid fa-bars text-2xl block md:hidden cursor-pointer"></i>
            </div>

            <div className={`${[menuIsOpen ? "block" : "hidden"]} md:block`}>
                {
                    <div className="w-screen min-h-screen bg-white fixed top-0 left-0 md:w-full md:min-h-0 md:sticky">
                        <div className="w-full flex items-center justify-between px-4 py-4 md:hidden">
                            <div></div>
                            <i 
                                onClick={ () => setMenuIsOpen(false) } 
                                className="fa-solid fa-circle-xmark text-3xl cursor-pointer">
                            </i>
                        </div>

                        <div className="text-center mt-20 md:mt-0 md:flex md:p-1">
                            {
                                pageButtons[pagePath].map((button : ButtonsInterface) => {
                                    if(button.isLink) {
                                        return (
                                            <PrimaryLink
                                                text={ button.text }
                                                path={ button.path }
                                                key={ button.path }
                                            >
                                                { button.text }
                                            </PrimaryLink>
                                        );
                                    }
                                    
                                    return (
                                        <a
                                            className="block text-xl mb-12 md:mb-0 md:flex items-center text-black md:text-lg md:mr-5 hover:text-primary ease-out duration-200"
                                            href={ button.path }
                                            key={ button.path }
                                        >
                                            { button.text }
                                        </a>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </header>
    );
}

export default Header;
