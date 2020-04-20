import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./../styles/main.less";
import Header from "./../components/header.component";
import StartSection from "./../components/startSection.component";
import PointsSection from "./../components/pointsSection.component";
import PrizesSection from "./../components/prizesSection.component";
import BeersSection from "./../components/beersSection.component";
import DownloadSeccion from "./../components/downloadSection.component";
import FooterSection from "./../components/footer.component";
import MarketPlaceSection from "./../components/marketPlaceSection.component";
import StartSectionBill from "./../components/billLayout/startSectionBill.component";

export default function Index() {
    const [isMobile,setMobile] = useState(null);

    useEffect(() => {
        setMobile(detectMobile());
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

    return (
        // title ?
        (
            <div className="main d-flex align-items-start">
            {
                i18next.t("BillLayout.Active")?
                <div>
                    <Header />
                    <div className="main__bgGray">
                        <div className="container">
                            <StartSectionBill />
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
