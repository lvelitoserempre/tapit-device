import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function DownloadSection(props) {
    const [isIos,setIos] = useState(null);
    const isAndroid = navigator.userAgent.match(/Android/i);

    useEffect(() => {
        setIos(detectIos());
    });

    function detectIos() {
        const toMatch = [
            /iPhone/i,
            /iPad/i,
            /iPod/i
        ];
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    const params = props.urlParams?'&referrer=utm_source%3D'+props.urlParams[0]+'%26utm_medium%3D'+props.urlParams[1]:'';

    const bothAppsHtml = <div className='row center-xs section__download-content'>
                            <div className='row center-xs col-xs-12'>
                                <div className="section__download-phone">
                                    <img src={i18next.t("Section6.LeftPhone")} />
                                </div>
                                <div className="section__download-phone">
                                    <img src={i18next.t("Section6.RightPhone")} />
                                </div>
                            </div>
                            <div className='row center-xs col-xs-12'>
                                <div className="section__download-logo">
                                    <a target="_blank" href={i18next.t("Section6.appStoreUrl")}>
                                        <img src={i18next.t("Section6.appStore")} />
                                    </a>
                                </div>
                                <div className="section__download-logo">
                                    <a target="_blank" href={`${i18next.t("Section6.googlePlayUrl")+params}`}>
                                        <img src={i18next.t("Section6.googlePlay")} />
                                    </a>
                                </div>
                            </div>
                        </div>
    const iosHtml = <div className='row center-xs section__download-content'>
                        <div className='row center-xs col-xs-12'>
                            <div className="section__download-phone">
                                <img src={i18next.t("Section6.LeftPhone")} />
                            </div>
                        </div>
                        <div className='row center-xs col-xs-12'>
                            <div className="section__download-logo">
                                <a target="_blank" href={i18next.t("Section6.appStoreUrl")}>
                                    <img src={i18next.t("Section6.appStore")} />
                                </a>
                            </div>
                        </div>
                    </div>
    const androidHtml = <div className='row center-xs section__download-content'>
                            <div className='row center-xs col-xs-12'>
                                <div className="section__download-phone">
                                    <img src={i18next.t("Section6.RightPhone")} />
                                </div>
                            </div>
                            <div className='row center-xs col-xs-12'>
                                <div className="section__download-logo">
                                    <a target="_blank" href={`${i18next.t("Section6.googlePlayUrl")+params}`}>
                                        <img src={i18next.t("Section6.googlePlay")} />
                                    </a>
                                </div>
                            </div>
                        </div>

    return (
        <section className='section section__download main__bgOrange'>
            <div className='container'>
                
                <div className='row center-xs'>
                    <h2 className="section__title row" dangerouslySetInnerHTML={{__html: i18next.t("Section6.Title")}} />
                    {
                        props.isMobile?
                            isAndroid?
                                androidHtml
                            :isIos?
                                iosHtml
                            :
                            bothAppsHtml
                        :
                        bothAppsHtml
                    }
                    
                    <div className='row center-xs'>
                        <div className="section__download-disclaimer">
                            <p dangerouslySetInnerHTML={{__html: i18next.t("Section6.Disclaimer")}} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
    

}