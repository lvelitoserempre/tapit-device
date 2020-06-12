import React from "react";
import ReactDOM from "react-dom";
import DownloadFooter from './downloadFooter.component';

export default function FooterSection(props) {

    const social = i18next.t("Footer.Social", { returnObjects: true })
    const links = i18next.t("Footer.Links", { returnObjects: true })
    let firstMenu = [];
    let secondMenu = [];

    return (
        <footer className='bg-gray-100 w-full mt-10 bg-right-bottom sm:bg-right bg-no-repeat bg-contain sm:bg-auto bg-footer border-t-2 border-orange-500'>
            <div className='container pt-8 px-4 md:px-0 mx-auto'>
                <div className='w-full sm:w-9/12 xl:w-9/12 px-4 inline-block'>
                    <div className="inline-block align-top">
                        <p className="text-orange-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextTapit")}</p>
                        {links.map((item,index)=>{
                            (index+2)%2==0?
                                firstMenu.push(item)
                            :
                                secondMenu.push(item)
                        })}
                        <div className="w-1/2 inline-block align-top">
                            <ul className='text-purple-500'>
                                {firstMenu.map((item,index)=>{
                                    return(
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
                            <ul className='text-purple-500'>
                                {secondMenu.map((item,index)=>{
                                    return(
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
                    <p className="text-orange-500 uppercase mb-6 font-bold text-xs tracking-widest">{i18next.t("Footer.TextFollow")}</p>
                    <ul className='text-purple-500'>
                        {social.map((item,index)=>{
                            return(
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
                <DownloadFooter isMobile={props.isMobile} urlParams={props.urlParams}/>
                <div className="border-t-2 border-gray-500 py-5 mt-12 ">
                    <img className='inline-block align-middle' src={i18next.t("Footer.Logo")} />
                    <p className='inline-block text-gray-700 ml-1 pl-2 border-l border-gray-600 align-middle text-xs'>
                        <span dangerouslySetInnerHTML={{__html: i18next.t("Footer.Copyright")}}/>
                    </p>
                </div>
            </div>
        </footer>
    )
    

}