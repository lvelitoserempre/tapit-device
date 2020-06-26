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
                        <span className="bg-orange-500"></span>
                        <span className="bg-orange-500"></span>
                        <span className="bg-orange-500"></span>
                        <ul className="fixed w-10/12 p-6 bg-gray-100 pt-10 h-full top-0 border-4 border-white" id="menu">
                            <li>
                                <img className="main-logo" src={i18next.t("BillLayout.Header.Logo")} />
                            </li>
                            <li>
                                <a className="app-button border-2 border-orange-500 bg-orange-500 text-white" href={i18next.t("BillLayout.Header.UrlLogin")}>
                                    {i18next.t("BillLayout.Header.LoginText")}
                                </a>
                            </li>
                            <img width="30" className="absolute icon-close" src={i18next.t("BillLayout.Header.IconClose")} />
                        </ul>
                    </div>
                </nav>
                <div className="w-full py-4 pb-0 sm:pb-4">
                    <div className="inline-block text-center md:text-left w-full md:w-1/2 mb-0 align-middle">
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
