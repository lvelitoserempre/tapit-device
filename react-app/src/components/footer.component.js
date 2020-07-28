import React from "react";
import ReactDOM from "react-dom";
import DownloadFooter from './downloadFooter.component';

export default function FooterSection(props) {

    const social = i18next.t("Footer.Social", { returnObjects: true })
    const links = i18next.t("Footer.Links", { returnObjects: true })
    let firstMenu = [];
    let secondMenu = [];

    return (
        <footer className='bg-neutral-100 w-full mt-10 bg-right-bottom sm:bg-right bg-no-repeat bg-contain sm:bg-auto bg-footer border-t-2 border-primary-500'>
            <div className='container pt-8 px-4 md:px-0 mx-auto'>
                <div className='w-full sm:w-9/12 xl:w-9/12 px-4 inline-block'>
                    <div className="inline-block align-top">
                        <p className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextTapit")}</p>
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
                    <p className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextFollow")}</p>
                    <ul className='text-secondary-500'>
                        {social.map((item, index) => {
                            return (
                                <li className="mb-5 w-1/2 sm:w-full inline-block" key={index}>
                                    <a target="_blank" href={item.Url}>
                                        <img src={item.Image} className="inline-block align-middle" />
                                        <span className="align-middle ml-3">{item.Name}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className='w-full sm:w-9/12 xl:w-9/12 px-4 inline-block pt-4'>
                    <div className="inline-block align-top w-full">
                        <p className="text-primary-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.Support.Title")}</p>
                        <div className="w-1/2 inline-block align-top">
                            <ul className='text-secondary-500'>
                                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                                    {i18next.t("Footer.Support.Phone")}
                                </li>
                                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                                    <a target="_blank" href={i18next.t("Footer.Support.Help.Url")}>
                                        {i18next.t("Footer.Support.Help.Text")}
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
                                <li className="w-full inline-block align-top sm:pb-0 pb-3 mb-5">
                                    <a target="_blank" href={i18next.t("Footer.Support.SIC.Url")}>
                                        {i18next.t("Footer.Support.SIC.Text")}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <DownloadFooter isMobile={props.isMobile} />
                <div className="border-t-2 border-neutral-500 py-5 mt-12 ">
                    <img className='inline-block align-middle' src={i18next.t("Footer.Logo")} />
                    <p className='inline-block text-neutral-700 ml-1 pl-2 border-l border-neutral-600 align-middle text-xs'>
                        <span dangerouslySetInnerHTML={{ __html: i18next.t("Footer.Copyright") }} />
                    </p>
                </div>
            </div>
        </footer>
    )


}
