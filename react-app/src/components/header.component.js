import React from "react";
import ReactDOM from "react-dom";

export default function Header() {


    return (
        <header className='header row middle-xs'>
            <div className="container">
                <div className="col-xs-12 col-sm-6">
                    <ul className="row middle-xs">
                        <li>
                            <img src={i18next.t("BillLayout.Header.Logo")}/>
                        </li>
                        <li>
                            <img src={i18next.t("BillLayout.Header.LogoPolas")}/>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <ul className="row middle-xs">
                        <li>
                            <a href={i18next.t("BillLayout.Header.UrlLogin")}>
                                {i18next.t("BillLayout.Header.TextLogin")}
                            </a>
                        </li>
                        <li>
                            <a href={i18next.t("BillLayout.Header.UrlSignup")}>
                                {i18next.t("BillLayout.Header.TextSignup")}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
    

}