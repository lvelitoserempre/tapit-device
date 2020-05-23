import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function DownloadFooter(props) {
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

    const bothAppsHtml = <div className='mt-4'>
                            <div className=''>
                                <div className="inline-block">
                                    <a target="_blank" href={i18next.t("Section6.appStoreUrl")}>
                                        <img src={i18next.t("Section6.appStore")} />
                                    </a>
                                </div>
                                <div className="inline-block ml-3">
                                    <a target="_blank" href={`${i18next.t("Section6.googlePlayUrl")+params}`}>
                                        <img src={i18next.t("Section6.googlePlay")} />
                                    </a>
                                </div>
                            </div>
                        </div>
    const iosHtml = <div className='mt-4'>
                            <div className=''>
                                <div className="inline-block">
                                    <a target="_blank" href={i18next.t("Section6.appStoreUrl")}>
                                        <img src={i18next.t("Section6.appStore")} />
                                    </a>
                                </div>
                            </div>
                        </div>
    const androidHtml = <div className='mt-4'>
                            <div className=''>
                                <div className="inline-block ml-3">
                                    <a target="_blank" href={`${i18next.t("Section6.googlePlayUrl")+params}`}>
                                        <img src={i18next.t("Section6.googlePlay")} />
                                    </a>
                                </div>
                            </div>
                        </div>

    return (
        <section className='container px-2 transform -translate-y-16 mx-auto'>
            <div className='bg-gray-100 w-full md:w-8/12 mx-auto py-8'>
                <div className='w-10/12 mx-auto'>
                    <div className='w-full lg:w-7/12 inline-block'>
                        <p className="text-orange-500 text-4xl" dangerouslySetInnerHTML={{__html: i18next.t("Section6.Title")}} />
                        {
                            props.isMobile?
                                null
                            :<p className="text-gray-800 font-bold">{i18next.t("Section6.Subtitle")}</p>
                        }
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
                    </div>
                    {
                        !props.isMobile?
                            <div className='w-full lg:w-5/12 inline-block'>
                                <div className="w-1/2 inline-block align-bottom">
                                    <p dangerouslySetInnerHTML={{__html: i18next.t("Section6.Disclaimer")}} />
                                </div>
                                <div className="w-1/2 inline-block align-bottom">
                                    <img width="105" src={i18next.t("Section6.QrCode")} />
                                </div>
                            </div>
                        :null
                    }
                </div>
            </div>
        </section>
    )
    

}