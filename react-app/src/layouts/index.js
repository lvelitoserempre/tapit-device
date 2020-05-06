import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {HashRouter,Route,Link} from "react-router-dom";
import "./../styles/main.less";
import events from "./../common/scripts/events";
import Header from "./../components/header.component";
import Agegate from "./../components/agegate.component"
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
    const [user,setUser] = useState(null);
    const [userDate,setUserDate] = useState(window.localStorage.getItem('anonymousUserBirthDate'));
    const [urlParams,setUrlParams] = useState(null);

    useEffect(() => {
        setMobile(detectMobile());
        if (!events) {
            initEvents();
        }
        let localUser = JSON.parse(window.localStorage.getItem('user'));
        if (localUser && !user) {
            setUser(localUser);
            window.location.href = window.location.origin + '/app/home';
        }
        let localDate = window.localStorage.getItem('anonymousUserBirthDate');
        if (!localDate) {
            document.body.style.overflow = "hidden";
        }
        if (!urlParams) {
            getUrlParams();
        }
    },[]);

    function saveBirthDate(value) {
        setUserDate(value);
        document.body.style.overflow = "auto";
        document.getElementById('agegate').style.display = 'none';
    }

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
    const request = new Request('https://us-central1-re-imagining-loyalty-dev.cloudfunctions.net/api-listEvents');
    const initEvents = () => {
        fetch(request, {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .then((data)=> {
            setEvents(data.data);
        });
    }
    function getUrlParams() {
        let str = window.location.search.toString();
        if (str != '' && str.includes('s=')) {
            let firstParam = str.split('s=');
            let secondParam = firstParam[1].split('&m=');
            setUrlParams(secondParam);
        } else if (str != '' && str.includes('utm_source=')) {
            let firstParam = str.split('utm_source=');
            let secondParam = firstParam[1].split('&utm_medium=');
            setUrlParams(secondParam);
        }
    }

    const isBillLayout = i18next.t("BillLayout.Active");

    const BillLayout = () => (
        <div>
            <Header user={user} />
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
    );

    const Home = () => (
        <div>
            <header>
            <a href="/app">
                <img src={i18next.t("Header.Logo")}/>
            </a>
            </header>
            <div className="main__bgGray">
                <div className="container">
                    <StartSection urlParams={urlParams} />
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
                <DownloadSeccion urlParams={urlParams} isMobile={isMobile} />
            </div>
        </div>
    )

    return (
        // title ?
        (
            <div className="main d-flex align-items-start">
                {
                    !userDate?
                        <Agegate saveBirthDate={()=>saveBirthDate()} />
                    :null
                }
                
                {

                        <HashRouter>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/polas-recargadas" component={BillLayout}/>
                        </HashRouter>
                }
                <FooterSection/>
            </div>
        )
    )

}

// Implementacion de este layout al HTML
ReactDOM.render(<Index/>, document.getElementById("index"));
