import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import "./../styles/main.less";
import Header from "./../components/header.component";
import Agegate from "./../components/agegate.component";
import CookiesSection from "./../components/cookiesModal.component"
import StartSection from "./../components/startSection.component";
import PointsSection from "./../components/pointsSection.component";
import PrizesSection from "./../components/prizesSection.component";
import BeersSection from "./../components/beersSection.component";
import FooterSection from "./../components/footer.component";
import MarketPlaceSection from "./../components/marketPlaceSection.component";
import StartSectionBill from "./../components/billLayout/startSectionBill.component";
import ComoParticiparSection from "./../components/billLayout/comoParticipar.component";
import EventsSection from "./../components/billLayout/events.component";

export default function Index() {
  const [isMobile, setMobile] = useState(null);
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  const [userDate, setUserDate] = useState(getCookie('anonymousUserBirthDate'));
  const [cookieSt, setCookieSt] = useState(null);
  const isBillLayout = i18next.t("BillLayout.Active");

  useEffect(() => {
    setMobile(detectMobile());
    if (!events) {
      initEvents();
    }
    let localUser = JSON.parse(window.localStorage.getItem('user'));
    if (localUser && !user) {
      setUser(localUser);
      window.location.href = window.location.origin + '/app';
    }
    //let localDate = window.localStorage.getItem('anonymousUserBirthDate');
    let localDate = getCookie('anonymousUserBirthDate');
    if (!localDate) {
      document.body.style.overflow = "hidden";
    }
    if (!cookieSt) {
      checkCookie();
    }
  }, []);



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
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const initEvents = () => {
    let origin = window.location.origin == i18next.t("PordEnvironment") ? i18next.t("ApiUrlProd") : i18next.t("ApiUrlDev");
    const request = new Request(origin + i18next.t("EventsUrl"));
    fetch(request, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setEvents(data.data);
      });
  }

  function setCookie(accept, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = accept + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(accept) {
    let name = accept + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let accept = getCookie("cookie_acceptance");
    if (accept != "") {
      setCookieSt(accept);
    }
  }

  function acceptCookie() {
    setCookie("cookie_acceptance", 'yes', 30);
    setCookieSt(getCookie("cookie_acceptance"));
  }

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
      <Header user={user} />
      <div className="mt-12">
        <div className="container">
          <StartSection />
        </div>
      </div>
      <div className="main__bgCircle">
        <div className="container">
          <PointsSection isMobile={isMobile} />
        </div>
      </div>
      <div className="main__bgBlue">
        <div className="container">
          <PrizesSection isMobile={isMobile} />
        </div>
      </div>
      <div>
        <div className="container">
          <MarketPlaceSection />
          <BeersSection isMobile={isMobile} />
        </div>
      </div>
    </div>
  )

  return (
    // title ?
    (
      <div className="main d-flex align-items-start">
        {
          !userDate ?
            <Agegate saveBirthDate={() => saveBirthDate()} />
            : null
        }
        {/* {
                    !cookieSt?
                        <CookiesSection acceptCookie={()=>acceptCookie()} />
                    :
                    null
                } */}
        {

          <HashRouter>
            <Route exact path="/" component={Home} />
            <Route exact path="/polas-recargadas" component={BillLayout} />
          </HashRouter>
        }
        <FooterSection isMobile={isMobile} />
      </div>
    )
  )

}

// Implementacion de este layout al HTML
ReactDOM.render(<Index />, document.getElementById("index"));
