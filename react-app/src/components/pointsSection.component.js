import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';
import Slider from "react-slick";

export default function PointsSection(props) {
    
    const pointsArr =  i18next.t("Section2.Points", { returnObjects: true });
    const animate =  i18next.t("Animations.Section2", { returnObjects: true })
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                }
            }
        ]
    };
    
    return (
        <section className='row section section section__slider'>
            <Plx parallaxData={ animate.Content } className="section__slider-container">
                <Slider {...settings}>
                    {pointsArr.map((point,index)=>{
                        return(
                            <div key={index} >
                                <div className="row middle-xs">
                                <div className="col-xs-10 col-lg-7 col-xs-offset-1 col-lg-offset-0 middle-xs">
                                    <h2 className="section__title" dangerouslySetInnerHTML={{__html: point.Title}} ></h2>
                                    <div className="row middle-xs section__slider-content">
                                        <div className="col-xs-3">
                                            <div className="section__slider-number">
                                                {index+1}
                                            </div>
                                        </div>
                                        <div className="col-xs-8">
                                            <p className="section__text" dangerouslySetInnerHTML={{__html: point.Text}}></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-xs-10 col-lg-5 col-xs-offset-1 col-lg-offset-0 middle-xs section__slider-image">
                                    <Plx className={"section__slider-image-"+index} parallaxData={ animate.Image }>
                                        <img src={point.Image} />
                                    </Plx>
                                </div>
                            </div>
                        </div>)
                    })}
                </Slider>
                {
                    props.isMobile?
                        <img src="../assets/images/hand.svg" width="26" className="section__slider-mouse" />
                    :
                        <img src="../assets/images/mouse.svg" width="26" className="section__slider-mouse" />
                }
                
            </Plx>
            
        </section>
    )
    

}