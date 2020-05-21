import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function PrizesSection(props) {

    const iconsArr = i18next.t("Section3.IconList", { returnObjects: true });
    const lines = i18next.t("Section3.Lines", { returnObjects: true });

    return (
        <section className='row section section section__prizes'>
            <div className="section__prizes-container">
            <div>
                <div className="col-xs-10 col-lg-10 col-xs-offset-1 col-lg-offset-2 middle-xs">
                    <h1 className="section__title section__title-small col-lg-6 col-xl-4" dangerouslySetInnerHTML={{__html: i18next.t("Section3.Title")}}></h1>
                    <div className="col-lg-6 col-xl-5">
                        <p className="section__text">{i18next.t("Section3.Text")}</p>
                    </div>
                    <div className="col-lg-6 col-xl-5">
                        {!props.isMobile?
                            <div className="start-xs" >
                                <img className="max-w-none mt-8" src={lines[0]} />
                            </div>
                        :
                            <ul className="section__prizes-icons row around-xs">
                                {
                                    iconsArr.map((icon,index)=>{
                                        return(
                                            <li key={index} className="row middle-xs">
                                                <img src={icon} />
                                            </li>)
                                        }
                                    )
                                }   
                            </ul>
                        }
                        
                    </div>
                    <div>

                    </div>
                </div>
                <Plx className="row end-xs section__prizes-image" >
                    <div className="col-xs-12 col-lg-8 col-xl-12">
                        <img src={i18next.t("Section3.Image")} />
                    </div>
                </Plx>
            </div>
            </div>
        </section>
    )
    

}