import React from "react";
import ReactDOM from "react-dom";

export default function ComoParticiparSection(props) {

    return (
        <section className='row section section section__participa'>
            <div className="section__participa-container">
                <div className="row middle-xs">
                    <div className="col-xs-10 col-lg-7 col-xs-offset-1 col-lg-offset-0 middle-xs">
                        <h2 className="section__title section__title-red" dangerouslySetInnerHTML={{__html: i18next.t("BillLayout.Section2.Title")}} ></h2>
                        <p className="section__text col-xs-11" dangerouslySetInnerHTML={{__html: i18next.t("BillLayout.Section2.Text")}}/>
                        <div className="col-xs-10 center-xs">
                            <a href={i18next.t("BillLayout.Section2.ButtonUrl")} className="section__button section__participa-button" >{i18next.t("BillLayout.Section2.ButtonText")}</a>
                        </div>
                    </div>
                    <div className="row col-xs-10 col-lg-5 col-xs-offset-1 col-lg-offset-0 middle-xs section__participa-image">
                        <img src={i18next.t("BillLayout.Section2.Image")} />
                    </div>
                </div>
            </div>
        </section>
    )
    

}