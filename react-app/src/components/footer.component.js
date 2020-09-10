import React from "react";
import DownloadFooter from './downloadFooter.component';

export default function FooterSection(props) {

  const social = i18next.t("Footer.Social", {returnObjects: true})
  const links = i18next.t("Footer.Links", {returnObjects: true})
  let firstMenu = [];
  let secondMenu = [];

  return (
    <footer
      className='bg-neutral-100 w-full mt-10 bg-right-bottom sm:bg-right bg-no-repeat bg-contain sm:bg-auto bg-footer border-t-2 border-primary-500'>
      <div className='container pt-8 px-4 md:px-0 mx-auto'>
        <div className='w-full sm:w-9/12 xl:w-9/12 px-4 inline-block'>
          <div className="inline-block align-top">
            <p
              className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextTapit")}</p>
            {links.map((item, index) => {
              (index + 2) % 2 == 0 ?
                firstMenu.push(item)
                :
                secondMenu.push(item)
            })}
            <div className="w-1/2 inline-block align-top">
              <ul className='text-secondary-500'>
                {firstMenu.map((item, index) => {
                  return (
                    <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5" key={index}>
                      <a target="_blank" href={item.Url}>
                        {item.Name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="w-1/2 inline-block align-top">
              <ul className='text-secondary-500'>
                {secondMenu.map((item, index) => {
                  return (
                    <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5" key={index}>
                      <a target="_blank" href={item.Url}>
                        {item.Name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-3/12 xl:w-3/12 inline-block align-top px-4">
          <p
            className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextFollow")}</p>
          <ul className='text-secondary-500'>
            {social.map((item, index) => {
              return (
                <li className="mb-5 w-1/2 sm:w-full inline-block" key={index}>
                  <a target="_blank" href={item.Url}>
                    <img src={item.Image} className="inline-block align-middle"/>
                    <span className="align-middle ml-3">{item.Name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='w-full sm:w-9/12 xl:w-9/12 px-4 inline-block pt-4'>
          <div className="inline-block align-top w-full">
            <p
              className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.Support.Title")}</p>
            <div className="w-1/2 inline-block align-top">
              <ul className='text-secondary-500'>
                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                  <a target="_blank" href={i18next.t("Footer.Support.Help.Url")}>
                    {i18next.t("Footer.Support.Help.Text")}
                  </a>
                </li>
                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                  <a target="_blank" href={i18next.t("Footer.Support.SIC.Url")}>
                    {i18next.t("Footer.Support.SIC.Text")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 inline-block align-top">
              <ul className='text-secondary-500'>
                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5 hidden">
                  <a target="_blank" href={i18next.t("Footer.Support.Contact.Url")}>
                    {i18next.t("Footer.Support.Contact.Text")}
                  </a>
                </li>
                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                  <a target="_blank" href={i18next.t("Footer.Support.Cancellation.Url")}>
                    {i18next.t("Footer.Support.Cancellation.Text")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <DownloadFooter isMobile={props.isMobile}/>

        <div className="block md:hidden visible px-5 mt-6"><p className="text-neutral-black text-xs">“El exceso de alcohol es
          perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad” </p></div>
        <div className="border-t-2 border-neutral-500 py-5 px-5 md:px-0 mt-8 md:mt-12 flex flex-wrap">
          <div className="w-full mt-4 sm:mt-1 order-1 md:w-1/3 sm:w-3/5">
            <img className="inline-block align-middle"
                 src="https://market.tapit.com.co/arquivos/tap-it_black-orange.png"/>
            <p className="inline-block text-neutral-700 ml-1 pl-2 border-l border-neutral-600 align-middle text-xs"><span>Todos los derechos reservados © 2020</span>
            </p></div>
          <div className="w-full mt-4 sm:mt-1 order-2 sm:order-3 sm:w-3/5 md:order-4 md:w-1/3 text-xs text-neutral-700">
            Prohíbase el expendio de bebidas embriagantes a menores de edad.
          </div>
          <div
            className="w-full mt-4 sm:mt-1 order-3 sm:order-5 sm:w-3/5 md:order-2 md:w-1/3 md:pl-12 text-xs text-neutral-700">
            El exceso de alcohol es perjudicial para la salud.
          </div>
          <div
            className="w-full mt-4 sm:mt-1 order-4 sm:order-2 sm:w-2/5 sm:pl-4 md:order-5 md:w-1/3 md:pl-12 text-xs text-neutral-700">
            No comparta este contenido con menores de edad.
          </div>
          <div
            className="w-full mt-4 sm:mt-1 order-5 sm:order-4 sm:w-2/5 sm:pl-4 md:order-3 md:w-1/3 md:pl-2 text-xs text-black font-bold">
            <span className="inline-block align-middle">www.hablemosdealcohol.com</span><span
            className="inline-block align-middle md:hidden visible">
        <img
          className="inline-block align-middle" src="https://market.tapit.com.co/arquivos/footer-icon-1.png"/>
        <img
          className="inline-block align-middle ml-1" src="https://market.tapit.com.co/arquivos/footer-icon-2.png"/>
        <img
          className="inline-block align-middle ml-1" src="https://market.tapit.com.co/arquivos/footer-icon-3.png"/></span>
          </div>
          <div className="w-full mt-4 sm:mt-1 order-6 md:w-1/3 md:pl-2 hidden md:block visible">
            <img
              className="inline-block align-middle" src="https://market.tapit.com.co/arquivos/footer-icon-1.png"/>
            <img
              className="inline-block align-middle ml-1" src="https://market.tapit.com.co/arquivos/footer-icon-2.png"/>
            <img
              className="inline-block align-middle ml-1" src="https://market.tapit.com.co/arquivos/footer-icon-3.png"/></div>
        </div>
      </div>
    </footer>
  )
}
