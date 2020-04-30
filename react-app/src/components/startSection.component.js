import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function StartSection() {

    const animate =  i18next.t("Animations.Section1", { returnObjects: true })

    return (
        <section className='row section section__start'>
            <div className="col-xs-10 col-lg-6 col-xs-offset-1 col-lg-offset-0 middle-xs">
                <h1 className="section__title" dangerouslySetInnerHTML={{__html: i18next.t("Section1.Title")}}></h1>
                <p className="section__text">{i18next.t("Section1.Text")}</p>
                <div className="section__button-container">
                    <a className="section__button" >{i18next.t("Section1.Button")}</a>
                </div>
            </div>
            <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-0 middle-xs section__start-content">
                <img className="section__start-content-cellphone" src={i18next.t("Section1.Image")}/>
                <Plx className="section__start-bubble1" >
                    <img src={i18next.t("Section1.BubbleTop")}  />
                </Plx>
                <Plx className="section__start-bubble2" >
                    <img src={i18next.t("Section1.BubbleBottom")} />
                </Plx>
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