import React from "react";
import ReactDOM from "react-dom";
import DownloadFooter from './downloadFooter.component';

export default function FooterSection(props) {

    const social = i18next.t("Footer.Social", { returnObjects: true })
    const links = i18next.t("Footer.Links", { returnObjects: true })

    return (
        <footer className='bg-purple-500 w-full mt-10'>
            <DownloadFooter isMobile={props.isMobile}/>
            <div className='container pt-8 -mt-6 px-4 md:px-0 mx-auto'>
                <div className='px-4'>
                    <div className="sm:w-3/12 xl:w-5/12 inline-block align-top">
                        <p className="text-orange-500 uppercase mb-6">{i18next.t("Footer.TextFollow")}</p>
                        <ul className='text-white'>
                            {social.map((item,index)=>{
                                return(
                                    <li className="mb-5" key={index}>
                                        <a target="_blank" href={item.Url}>
                                            <img src={item.Image} className="inline-block align-middle" /> 
                                            <span className="align-middle ml-3">{item.Name}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="sm:w-9/12 xl:w-7/12 inline-block align-top">
                        <p className="text-orange-500 uppercase mb-6">{i18next.t("Footer.TextTapit")}</p>
                        <ul className='text-white'>
                            {links.map((item,index)=>{
                                return(
                                    <li className="w-full xl:w-1/3 sm:w-1/2 inline-block align-top sm:pb-5 pb-3 xl:pb-0" key={index}>
                                        <a target="_blank" href={item.Url}>
                                            {item.Name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="border-t-2 border-gray-800 py-5 mt-12 ">
                    <img className='inline-block align-middle' src={i18next.t("Footer.Logo")} />
                    <p className='inline-block text-gray-600 ml-1 pl-2 border-l border-gray-600 align-middle'>
                        <small dangerouslySetInnerHTML={{__html: i18next.t("Footer.Copyright")}}/>
                    </p>
                </div>
            </div>
        </footer>
    )
    

}