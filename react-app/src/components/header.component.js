import React from "react";
import ReactDOM from "react-dom";

export default function Header(props) {

    return (
        
        <header className='header'>
            <div className="container">
                <div className="row middle-xs">
                    <div className="col-xs-12 col-sm-6">
                        <ul className="row middle-xs center-xs start-sm header__logos">
                            <li className="header__logos-logo-tapil">
                                <img src={i18next.t("BillLayout.Header.Logo")}/>
                            </li>
                            <li className="header__logos-logo-polas">
                                <img src={i18next.t("BillLayout.Header.LogoPolas")}/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        {
                            props.user?
                            <ul className="row center-xs end-sm header__buttons">
                                <li>
                                    {`${props.user.firstName} ${props.user.lastName?props.user.lastName:''}`}
                                </li>
                            </ul>
                            :
                            <ul className="row center-xs end-sm header__buttons">
                                <li>
                                    <a className="header__button" href={i18next.t("BillLayout.Header.UrlLogin")}>
                                        {i18next.t("BillLayout.Header.LoginText")}
                                    </a>
                                </li>
                                <li>
                                    <a className="header__button" href={i18next.t("BillLayout.Header.UrlSignup")}>
                                        {i18next.t("BillLayout.Header.SignupText")}
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