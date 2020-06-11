import React from "react";
import ReactDOM from "react-dom";

export default function Header(props) {

    return (

        <header className='shadow-lg rounded-b-2xl mb-6'>
            <div className="w-full px-8 py-4">
                <div className="inline-block text-center md:text-left w-full md:w-1/2 mb-3 md:mb-0 align-middle">
                    <ul>
                        <li>
                            <img src={i18next.t("BillLayout.Header.Logo")}/>
                        </li>
                    </ul>
                </div>
                <div className="inline-block text-center md:text-right w-full md:w-1/2 align-middle">
                    {
                        props.user?
                        <ul>
                            <li>
                                {`${props.user.firstName} ${props.user.lastName?props.user.lastName:''}`}
                            </li>
                        </ul>
                        :
                        <ul>
                            <li className="inline-block">
                                <a className="app-button border-2 border-orange-500 bg-orange-500 text-white" href={i18next.t("BillLayout.Header.UrlLogin")}>
                                    {i18next.t("BillLayout.Header.LoginText")}
                                </a>
                            </li>
                        </ul>
                    }

                </div>
            </div>
        </header>
    )


}
