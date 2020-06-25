import React from "react";

export default function Header(props) {

    function setMenu(e) {
        console.log(e.target);
        if (e.target.checked) {
            console.log(true);
            document.body.classList.add('overflow-hidden');
        } else {
            console.log(false);
            document.body.classList.remove('overflow-hidden');
        }
    }

    return (

        <header className='shadow-lg rounded-b-2xl mb-6'>
            <div className='container'>
                <nav role="navigation" className="block sm:hidden">
                    <div id="menuToggle" className="absolute block w-full">
                        <input type="checkbox" onClick={setMenu} />
                        <div className="background"></div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className="fixed w-10/12 p-6 bg-white pt-10 h-full top-0" id="menu">
                            <li>
                                <img src={i18next.t("BillLayout.Header.Logo")} />
                            </li>
                            <li>
                                <a className="app-button border-2 border-orange-500 bg-orange-500 text-white" href={i18next.t("BillLayout.Header.UrlLogin")}>
                                    {i18next.t("BillLayout.Header.LoginText")}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="w-full py-4">
                    <div className="inline-block text-center md:text-left w-full md:w-1/2 mb-3 md:mb-0 align-middle">
                        <ul>
                            <li>
                                <img src={i18next.t("BillLayout.Header.Logo")} />
                            </li>
                        </ul>
                    </div>
                    <div className="inline-block text-center md:text-right w-full md:w-1/2 align-middle">
                        {
                            props.user ?
                                <ul>
                                    <li>
                                        {`${props.user.firstName} ${props.user.lastName ? props.user.lastName : ''}`}
                                    </li>
                                </ul>
                                :
                                <ul>
                                    <li className="hidden sm:inline-block">
                                        <a className="app-button border-2 border-orange-500 bg-orange-500 text-white" href={i18next.t("BillLayout.Header.UrlLogin")}>
                                            {i18next.t("BillLayout.Header.LoginText")}
                                        </a>
                                    </li>
                                </ul>
                        }

                    </div>
                </div>
            </div>

        </header>
    )


}
