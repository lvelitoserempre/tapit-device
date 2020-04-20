import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function StartSectionBill() {

    const animate =  i18next.t("Animations.Section1", { returnObjects: true })

    return (
        <section className='row section section__start'>
            <div className="col-xs-10 col-lg-6 col-xs-offset-1 col-lg-offset-0 middle-xs">
                <h1 className="section__title section__title-red" dangerouslySetInnerHTML={{__html: i18next.t("BillLayout.Section1.Title")}}></h1>
                <p className="section__text">{i18next.t("BillLayout.Section1.Text")}</p>
            </div>
            <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-0 middle-xs section__start-content">
                <img className="section__start-content-cellphone" src={i18next.t("BillLayout.Section1.Image")}/>
            </div>
            <div className="section__start__bottom-line row middle-xs col-xs-12">
                <Plx className="section__start__bottom-line-animation" parallaxData={ animate.Bottle1 }>
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" parallaxData={ animate.Bottle2 }>
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" parallaxData={ animate.Bottle3 }>
                    <img src="../assets/images/bottle.svg" width="16" />
                </Plx>
                <Plx className="section__start__bottom-line-animation section__start__bottom-line-animation-line" parallaxData={ animate.Line }>
                    <img src="../assets/images/line.svg" width="854" />
                </Plx>
                <Plx className="section__start__bottom-line-animation" parallaxData={ animate.Elipse }>
                    <img src="../assets/images/elipse.svg" width="16" />
                </Plx>
            </div>
        </section>
    )
    

}