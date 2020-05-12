import React from "react";
import ReactDOM from "react-dom";

export default function CookiesSection(props) {

    return (
        <div className='cookies middle-xs row'>
            <div className='container'>
                <div className='row middle-xs'>
                    <div className="col-sm-7 col-lg-7">
                        <p className="center-xs start-sm" dangerouslySetInnerHTML={{__html: i18next.t("CookiesModal.Text")}}/>
                    </div>
                    <div className="col-sm-3">
                        <p className="center-xs">
                            <a href='/cookies.html' target="_blank" dangerouslySetInnerHTML={{__html: i18next.t("CookiesModal.ConfigurationText")}}/>
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <button onClick={props.acceptCookie} className="section__button">{i18next.t("CookiesModal.ButtonText")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
    

}