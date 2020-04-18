import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function MarketPlaceSection(props) {

    return (
        <section className='row section section section__marketplace'>
            <div className="section__marketplace-container">
                <div className="row middle-xs">
                    <div className="row col-xs-10 col-lg-7 col-xs-offset-1 col-lg-offset-0 middle-xs section__marketplace-image visible-md">
                        <img src={i18next.t("Section4.Image")} />
                    </div>
                    <div className="col-xs-10 col-lg-5 col-xs-offset-1 col-lg-offset-0 middle-xs">
                        <h2 className="section__title" dangerouslySetInnerHTML={{__html: i18next.t("Section4.Title")}} ></h2>
                    </div>
                    <div className="row col-xs-10 col-lg-7 col-xs-offset-1 col-lg-offset-0 middle-xs section__marketplace-image hidden-md">
                        <img src={i18next.t("Section4.Image")} />
                    </div>
                </div>
            </div>
        </section>
    )
    

}