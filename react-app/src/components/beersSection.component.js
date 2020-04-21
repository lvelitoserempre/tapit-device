import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';
import Slider from "react-slick";

export default function BeersSection(props) {

    const animate =  i18next.t("Animations.Section5", { returnObjects: true });
    const images = i18next.t("Section5.BeersImages", { returnObjects: true });
    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <section className={`row section section__beers center-xs ${props.isBill?'section__beers-bg':''}`}>
            {
                props.isBill?
                    <h2 className="section__title section__title-red">{i18next.t("Section5.Title")}</h2>
                    :null
            }
            <Plx className="section__beers-container">
                <Slider {...settings} className="section__beers-slider">
                    {images.map((image,index)=>{
                        return(
                            <div key={index} className="section__beers-slider-image row center-xs">
                                <img src={image}  />
                            </div>
                        )
                    })}
                </Slider>
                {
                    props.isMobile?
                        <img src="../assets/images/hand.svg" width="26" className="section__beers-slider-mouse" />
                    :
                        <img src="../assets/images/mouse.svg" width="26" className="section__beers-slider-mouse" />
                }
            </Plx>
        </section>
    )
}