import React, {useEffect, useState} from "react";
import UrlService from "./url.service";

export default function DownloadFooter(props) {
  const [isIos, setIos] = useState(null);
  const isAndroid = navigator.userAgent.match(/Android/i);

  useEffect(() => {
    setIos(detectIos());
  });

  function detectIos() {
    const toMatch = [
      /iPhone/i,
      /iPod/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const searchMap = UrlService.getSearchMap();
  const url = searchMap ? '&referrer=utm_source%3D' + (searchMap.utm_source || searchMap.s) + '%26utm_medium%3D' + (searchMap.utm_medium || searchMap.m) : '';

  const bothAppsHtml = <div className="hidden sm:block">
    <div className=''>
      <div className="inline-block">
        <a target="_blank" href={i18next.t("Section6.appStoreUrl")}>
          <img src={i18next.t("Section6.appStore")}/>
        </a>
      </div>
      <div className="inline-block ml-3">
        <a target="_blank" href={`${i18next.t("Section6.googlePlayUrl") + url}`}>
          <img src={i18next.t("Section6.googlePlay")}/>
        </a>
      </div>
    </div>
    <p className='inline-block text-gray-700 align-middle text-xs'>
      {i18next.t("Section6.BobileDevices")}
    </p>
  </div>
  const iosHtml = <div className='mt-4 block sm:hidden'>
    <div className=''>
      <div className="inline-block">
        <a target="_blank"
           className="app-button border-2 border-orange-500 bg-orange-500 text-white px-2 py-2 uppercase text-xs"
           href={i18next.t("Section6.appStoreUrl")}>
          <img className="inline-block align-middle mr-2" src={i18next.t("Section6.ButtonImg")}/>
          <p className="inline-block align-middle">{i18next.t("Section6.ButtonText")}</p>
        </a>
      </div>
    </div>
  </div>
  const androidHtml = <div className='mt-4 block sm:hidden'>
    <div className=''>
      <div className="inline-block">
        <a target="_blank"
           className="app-button border-2 border-orange-500 bg-orange-500 text-white px-2 py-2 uppercase text-xs"
           href={`${i18next.t("Section6.googlePlayUrl") + url}`}>
          <img className="inline-block align-middle mr-2" src={i18next.t("Section6.ButtonImg")}/>
          <p className="inline-block align-middle">{i18next.t("Section6.ButtonText")}</p>
        </a>
      </div>
    </div>
  </div>

  return (
    <section className='container px-2 transform mx-auto mt-2'>
      <div className='bg-gray-100 w-full md:w-11/12 lg:w-8/12 xl:w-7/12 py-8 border-4 border-white shadow-sm'>
        <div className='w-11/12 mx-auto'>
          <div className='w-full sm:w-7/12 inline-block align-top'>
            <p className="text-orange-500 font-bold " dangerouslySetInnerHTML={{__html: i18next.t("Section6.Title")}}/>
            <p className="mb-3 text-sm">{i18next.t("Section6.Subtitle")}</p>
            {
              props.isMobile ?
                isAndroid ?
                  androidHtml
                  : isIos ?
                  iosHtml
                  :
                  bothAppsHtml
                :
                bothAppsHtml
            }
          </div>
          {
            !props.isMobile ?
              <div className='w-full sm:w-5/12 sm:inline-block align-top hidden'>
                <div className="w-1/2 inline-block align-top text-xs text-gray-700">
                  <p dangerouslySetInnerHTML={{__html: i18next.t("Section6.Disclaimer")}}/>
                </div>
                <div className="w-1/2 inline-block align-top pl-4">
                  <img className="max-w-none" width="120" src={i18next.t("Section6.QrCode")}/>
                </div>
              </div>
              : null
          }
        </div>
      </div>
    </section>
  )


}
