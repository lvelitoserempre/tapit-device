import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function FooterSection() {

    const social = i18next.t("Footer.Social", { returnObjects: true })

    return (
        <footer className='footer bg-purple-500'>
            <div className="footer__legal">
                <div className='row center-xs'>
                    <img src={i18next.t("Footer.LegalImage")} />
                </div>
            </div>
            <div className='container'>
                <div className='row middle-xs'>
                    <div className="col-sm-3 col-lg-2 col-lg-offset-1 col-sm-offset-0 footer__follow">
                        <p className="row center-xs">{i18next.t("Footer.TextFollow")}</p>
                        <ul className='footer__social row center-xs middle-sm'>
                            {social.map((item,index)=>{
                                return(
                                    <li className="row middle-xs" key={index}>
                                        <a target="_blank" href={item.Url}>
                                            <img src={item.Image} />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="row col-sm-6 footer__copyright">
                        <img src={i18next.t("Footer.Logo")} />
                        <p>
                            <small dangerouslySetInnerHTML={{__html: i18next.t("Footer.Copyright")}}/>
                        </p>
                    </div>
                    <div className="row col-sm-2 footer__polas">
                        <img src={i18next.t("Footer.LogoPolas")} />
                    </div>
                </div>
            </div>
        </footer>
    )
    

}