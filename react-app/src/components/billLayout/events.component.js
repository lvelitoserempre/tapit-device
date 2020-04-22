import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

export default function EventsSection(props) {

    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className='events'>
            <div className="container">
                <div className="col-xs-11 col-lg-9">
                    <h2 className="section__title section__title-red">{i18next.t("BillLayout.SectionEvents.Title")}</h2>
                </div>
            </div>
            {props.events?
                <Slider {...settings}>
                    {
                        props.events.map((event,index)=>{
                            return (
                                <div key={index} style={{backgroundImage:event.image}} className="events__slide">
                                    <img src={event.image} className="events__image"/>
                                    <h3 className="events__title">{`0${index + 1}`}</h3>
                                    <div className="events__text">
                                        <h4 className="events__name">{event.name}</h4>
                                        <h4 className="events__required">{event.requiredBeers} Cervezas</h4>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            :null}
            {
                props.isMobile?
                    <img src="../../assets/images/hand.svg" width="26" className="section__slider-mouse" />
                :
                    <img src="../../assets/images/mouse.svg" width="26" className="section__slider-mouse" />
            }
        </section>
    )
    

}