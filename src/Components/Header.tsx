import { Link } from "react-router-dom";
import logoImage from "../public/images/logo.svg"
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface ButtonsInterface {
    text: string,
    path: string,
    isLink: boolean,
}

interface PageButtonsInterface {
    [key: string] : Array<ButtonsInterface>
}


function Header() {
    const pagePath : string  = useLocation().pathname;
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    let pageButtons : PageButtonsInterface = {
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
    };

    return (
        <header className="fixed z-50 w-full flex justify-between items-center px-4 md:px-10 py-2 bg-white drop-shadow-lg">
            <a href="#main">
                <img src={ logoImage } className="w-12 md:w-16" />
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
                                pageButtons[pagePath].map((button : ButtonsInterface , key : number) => {
                                    if(button.isLink) {
                                        return (
                                            <Link to={ button.path } className="rounded-full text-xl text-white font-bold py-2 px-4 bg-primary drop-shadow-lg border-2 border-primary md:text-lg hover:bg-white hover:text-primary ease-out duration-200">{ button.text }</Link>
                                        );
                                    }
                                    
                                    return (
                                        <a
                                            key={ key }
                                            className="block text-xl mb-12 md:mb-0 md:flex items-center text-black md:text-lg md:mr-5 hover:text-primary ease-out duration-200"
                                            href={ button.path }
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
