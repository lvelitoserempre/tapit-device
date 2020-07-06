import React, { useEffect, useState } from "react";
import UrlService from "./url.service";

export default function StartSection(props) {
  const [isIos, setIos] = useState(null);

  useEffect(() => {
    setIos(detectIos());
  }, []);

  function detectIos() {
    const toMatch = [
      /Mac OS/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const searchMap = UrlService.getSearchMap();
  const url = searchMap ? '&referrer=utm_source%3D' + (searchMap.utm_source || searchMap.s) + '%26utm_medium%3D' + (searchMap.utm_medium || searchMap.m) : '';

  return (
    <section className='row section section__start center-xs bg-no-repeat bg-right-top relative'>
      <div className="col-xs-11 col-md-6 col-lg-4 col-lg-offset-0 middle-xs start-xs">
        <h1 className="section__title mt-0" dangerouslySetInnerHTML={{ __html: i18next.t("Section1.Title") }}></h1>
        <p className="section__text">{i18next.t("Section1.Text")}</p>
        <div className="section__button-container mt-5">
          {
            isIos ?
              <a className="app-button border-2 border-orange-500 bg-orange-500 text-white"
                href={i18next.t("Section6.appStoreUrl")} target="_blank">{i18next.t("Section1.Button")}</a>
              :
              <a className="app-button border-2 border-orange-500 bg-orange-500 text-white"
                href={`${i18next.t("Section6.googlePlayUrl") + url}`}
                target="_blank">{i18next.t("Section1.Button")}</a>
          }

        </div>
      </div>
      <div
        className="col-xs-12 col-md-4 col-lg-4 col-md-offset-1 col-lg-offset-0 middle-xs section__start-content center-xs end-md">
        <img className="section__start-content-cellphone" src={i18next.t("Section1.Image")} />
      </div>
      <div
        className="section__start__bottom-line col-xs-11 col-lg-8 col-lg-offset-0 start-xs hidden sm:block">
        <img src="../assets/images/beers-section1.svg" />
      </div>
      <div
        className="section__start__bottom-line-mobile sm:hidden block absolute">
        <img src="../assets/images/beers-section1-mobile.svg" />
      </div>
    </section>
  )


}
