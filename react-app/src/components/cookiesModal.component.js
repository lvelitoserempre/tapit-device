import React from "react";
import ReactDOM from "react-dom";

export default function CookiesSection(props) {

    return (
        <div className='cookies middle-xs row'>
            <div className='container'>
                <div className='row middle-xs'>
                    <div className="col-sm-12 col-lg-8">
                        <p className="center-xs start-sm cookies__text" dangerouslySetInnerHTML={{__html: i18next.t("CookiesModal.Text")}}/>
                    </div>
                    <div className="col-sm-12 col-lg-4 row middle-xs">
                        <div className="col-sm-6 col-lg-8">
                            <p className="center-xs end-sm">
                                <a className="cookies__button cookies__button-white" href='/cookies.html' target="_blank" dangerouslySetInnerHTML={{__html: i18next.t("CookiesModal.ConfigurationText")}}/>
                            </p>
                        </div>
                        <div className="col-sm-6 col-lg-4 center-xs start-sm">
                            <button onClick={props.acceptCookie} className="section__button">{i18next.t("CookiesModal.ButtonText")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    

}