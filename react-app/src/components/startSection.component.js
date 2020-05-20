import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function StartSection(props) {
    const [isIos,setIos] = useState(null);

    useEffect(() => {
        setIos(detectIos());
    },[]);

    function detectIos() {
        const toMatch = [
            /Mac OS/i
        ];
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    const params = props.urlParams?'&referrer=utm_source%3D'+props.urlParams[0]+'%26utm_medium%3D'+props.urlParams[1]:'';
    return (
        <section className='row section section__start center-xs bg-no-repeat bg-right-top'>
            <div className="col-xs-10 col-lg-4 col-xs-offset-1 col-lg-offset-0 middle-xs start-xs">
                <h1 className="section__title mt-0" dangerouslySetInnerHTML={{__html: i18next.t("Section1.Title")}}></h1>
                <p className="section__text">{i18next.t("Section1.Text")}</p>
                <div className="section__button-container mt-5">
                    {
                        isIos?
                            <a className="section__button" href={i18next.t("Section6.appStoreUrl")} target="_blank" >{i18next.t("Section1.Button")}</a>
                        :
                            <a className="section__button" href={`${i18next.t("Section6.googlePlayUrl")+params}`} target="_blank" >{i18next.t("Section1.Button")}</a>
                    }
                    
                </div>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-4 col-md-offset-2 col-lg-offset-0 middle-xs section__start-content end-xs">
                <img className="section__start-content-cellphone" src={i18next.t("Section1.Image")}/>
            </div>
            <div className="section__start__bottom-line row middle-xs col-xs-12 col-lg-8 start-xs">
                <img src="../assets/images/beers-section1.svg" />
            </div>
        </section>
    )
    

}