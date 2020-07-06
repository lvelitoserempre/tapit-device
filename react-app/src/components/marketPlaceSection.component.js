import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function MarketPlaceSection(props) {

    return (
        <section className='row section section section__marketplace'>
            <div className="section__marketplace-container">
                <div className="row middle-xs center-xs">
                    <div className="col-xs-10 col-sm-6 col-lg-3 col-xs-offset-1 col-sm-offset-0 middle-xs section__marketplace-image hidden sm:block">
                        <img src={i18next.t("Section4.Image")} />
                    </div>
                    <div className="col-xs-11 col-sm-5 col-lg-3 col-lg-offset-1 middle-xs start-xs pt-16 sm:pt-0">
                        <h2 className="section__title section__title-small" dangerouslySetInnerHTML={{ __html: i18next.t("Section4.Title") }} ></h2>
                    </div>
                    <div className="col-xs-10 col-xs-offset-1 middle-xs section__marketplace-image sm:hidden block">
                        <img src={i18next.t("Section4.Image")} />
                    </div>
                </div>
            </div>
        </section>
    )


}