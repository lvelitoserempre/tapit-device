import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./../styles/main.less";
import events from "./../common/scripts/events";
import Header from "./../components/header.component";
import StartSection from "./../components/startSection.component";
import PointsSection from "./../components/pointsSection.component";
import PrizesSection from "./../components/prizesSection.component";
import BeersSection from "./../components/beersSection.component";
import DownloadSeccion from "./../components/downloadSection.component";
import FooterSection from "./../components/footer.component";
import MarketPlaceSection from "./../components/marketPlaceSection.component";
import StartSectionBill from "./../components/billLayout/startSectionBill.component";
import ComoParticiparSection from "./../components/billLayout/comoParticipar.component";
import EventsSection from "./../components/billLayout/events.component";

export default function Index() {
    const [isMobile,setMobile] = useState(null);
    const [events,setEvents] = useState(null);

    useEffect(() => {
        setMobile(detectMobile());
        if (!events) {
            initEvents();
        }
    });

    function detectMobile() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }
    const initEvents = () => {
        fetch('/scripts/events.json')
        .then(response => {
            return response.json();
        })
        .then((data)=> {
            setEvents(data);
        });
      }

    const isBillLayout = i18next.t("BillLayout.Active")

    return (
        // title ?
        (
            <div className="main d-flex align-items-start">
            {
                isBillLayout?
                <div>
                    <Header />
                    <div className="main__bgGray">
                        <div className="container">
                            <StartSectionBill isMobile={isMobile} />
                        </div>
                        <EventsSection events={events} isMobile={isMobile} />
                    </div>
                    <div className="main__bgGray">
                        <div className="container">
                            <ComoParticiparSection />
                            <BeersSection isBill={isBillLayout} isMobile={isMobile} />
                        </div>
                    </div>
                </div>
                :
                <div>
                    <header>
                    <a href="/app">
                        <img src={i18next.t("Header.Logo")}/>
                    </a>
                    </header>
                    <div className="main__bgGray">
                        <div className="container">
                            <StartSection />
                            <PointsSection isMobile={isMobile} />
                        </div>
                    </div>
                    <div className="main__bgBlue">
                        <div className="container">
                            <PrizesSection isMobile={isMobile} />
                        </div>
                    </div>
                    <div className="main__bgGray">
                        <div className="container">
                            <MarketPlaceSection />
                            <BeersSection isMobile={isMobile} />
                        </div>
                        <DownloadSeccion isMobile={isMobile} />
                    </div>
                </div>
            }
                
                <FooterSection/>
            </div>
        )
    )

}

// Implementacion de este layout al HTML
ReactDOM.render(<Index />, document.getElementById("index"));
