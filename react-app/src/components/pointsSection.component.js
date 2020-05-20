import React from "react";
import ReactDOM from "react-dom";
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
            <div className="section__slider-container">
                <Slider {...settings}>
                    {pointsArr.map((point,index)=>{

                        const HtlmImage = <div className={`row col-xs-10 col-lg-4 col-xs-offset-1 col-lg-offset-0 middle-xs section__slider-image relative end-lg ${index == 1 && !props.isMobile?`section__slider-image-lay2`:''}`}>
                                            <div className={"section__slider-image-"+index} 
                                                // parallaxData={ animate.Image }
                                            >
                                                <img src={point.Image} />
                                            </div>
                                        </div>

                        const HtmlText = <div className="col-xs-10 col-lg-4 col-xs-offset-1 col-lg-offset-0 middle-xs start-xs">
                                            <h2 className="section__title section__title-small mb-8" dangerouslySetInnerHTML={{__html: point.Title}} ></h2>
                                            <div className="row middle-xs section__slider-content  relative pt-6">
                                                <div className="col-xs-1">
                                                    <div className="section__slider-number">
                                                        {index+1}
                                                    </div>
                                                </div>
                                                <div className="col-xs-8">
                                                    <p className="section__text" dangerouslySetInnerHTML={{__html: point.Text}}></p>
                                                </div>
                                            </div>
                                        </div>
                        return(
                            <div key={index} >
                                <div className="row middle-xs center-sm">
                                    {index == 1 && !props.isMobile?
                                        HtlmImage
                                    :
                                        HtmlText
                                    }
                                    {index == 1 && !props.isMobile?
                                        HtmlText
                                    :
                                        HtlmImage
                                    }
                                </div>
                            </div>
                        )
                    })}
                </Slider>
                {
                    props.isMobile?
                        <img src="../assets/images/hand.svg" width="26" className="section__slider-mouse" />
                    :
                        <img src="../assets/images/mouse.svg" width="26" className="section__slider-mouse" />
                }
                
            </div>
            
        </section>
    )
    

}