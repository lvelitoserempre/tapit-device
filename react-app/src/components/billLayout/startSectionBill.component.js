import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function StartSectionBill(props) {

    const animate =  i18next.t("Animations.Section1", { returnObjects: true })

    return (
        <section className='row section section__start middle-xs bg-no-repeat bg-right-top'>
            <div className="col-xs-10 col-lg-7 col-xs-offset-1 col-lg-offset-0 middle-xs">
                <h1 className="section__title section__title-red" dangerouslySetInnerHTML={{__html: i18next.t("BillLayout.Section1.Title")}}></h1>
                <p className="section__text col-xs-10">{i18next.t("BillLayout.Section1.Text")}</p>
            </div>
            <div className="col-xs-12 col-md-8 col-lg-5 col-md-offset-2 col-lg-offset-0 middle-xs section__start-content">
                <img className="section__start-content-cellphone section__start-content-cellphone2" src={i18next.t("BillLayout.Section1.Image")}/>
                {
                    !props.isMobile?
                        <img className="section__start-content-scroll" width="27" src={i18next.t("BillLayout.Section1.ImageScroll")}/>
                    :null
                }
            </div>
            <div className="section__start__bottom-line row middle-xs col-xs-12">
                <Plx className="section__start__bottom-line-animation" >
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" >
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" >
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation section__start__bottom-line-animation-line" >
                    <img src="../assets/images/line.svg" width="854" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" >
                    <img src="../assets/images/elipse.svg" width="16" />
                </Plx>
            </div>
        </section>
    )
    

}