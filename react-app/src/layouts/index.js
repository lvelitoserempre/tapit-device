import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./../styles/main.less";
import Header from "./../components/header.component";
import Agegate from "./../components/agegate.component";
import StartSection from "./../components/startSection.component";
import PointsSection from "./../components/pointsSection.component";
import PrizesSection from "./../components/prizesSection.component";
import BeersSection from "./../components/beersSection.component";
import FooterSection from "./../components/footer.component";
import MarketPlaceSection from "./../components/marketPlaceSection.component";
import StartSectionBill from "./../components/billLayout/startSectionBill.component";
import ComoParticiparSection from "./../components/billLayout/comoParticipar.component";
import EventsSection from "./../components/billLayout/events.component";
import {CookiesService} from "../services/cookies.service";
import UrlBuilder from "../services/url-builder.service";

export default function Index() {
  const [isMobile, setMobile] = useState(null);
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  const [userDate, setUserDate] = useState(null);
  const [userData, setUserData] = useState(null);
  const isBillLayout = i18next.t("BillLayout.Active");

  useEffect(() => {
    setMobile(detectMobile());
    setUserDate(CookiesService.getValue('anonymousUserBirthDate'));

    let loggedUser = CookiesService.getObject('loggedUser');
    setUser(loggedUser);

    if (loggedUser) {
      window.location.replace(UrlBuilder.buildUrl('market'))
    }
    let anonymousUserBirthDate = CookiesService.getValue('anonymousUserBirthDate');
    if (!anonymousUserBirthDate) {
      document.body.style.overflow = "hidden";
    }
  }, []);

  window.configTapitSso = () => {
    const auth = ssoApp.auth;
    const firestore = ssoApp.firestore;

    auth.onAuthStateChanged(function (userCredential) {
      if (userCredential) {
        window.ssoApp.getCustomToken(userCredential)
          .subscribe(customToken => {
            let url = 'https://market-dev.tapit.com.co';

            switch (window.location.hostname) {
              case 'tapit.com.co':
                url = 'https://market.tapit.com.co';
                break;

              case 'qa.tapit.com.co':
                url = 'https://market.qa.tapit.com.co';
                break;

              case 'dev.tapit.com.co':
                url = 'https://market-dev.tapit.com.co';
                break;
            }

            window.location.replace(url + '?customToken=' + customToken);
          });

        firestore.collection('user_account_tap').doc(userCredential.uid).get()
          .then(function (documentSnapshot) {
            let user = documentSnapshotToObject(documentSnapshot)
            console.log(user, documentSnapshot)
            setUserData(user);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }


  function saveBirthDate(value) {
    setUserDate(value);
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);
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

  function documentSnapshotToObject(documentSnapshot) {
    const object = documentSnapshot.data() || {};
    object.id = documentSnapshot.id;

    return object;
  }

    function showSSOPopup() {
    window.ssoApp.showApp();
  }

  function logout() {
    window.ssoApp.logout();
    setUserData(null);
  }

  const BillLayout = () => (
    <div>
      <Header
        user={user}/>
      <div className="main__bgGray">
        <div className="container">
          <StartSectionBill isMobile={isMobile}/>
        </div>
        <EventsSection events={events} isMobile={isMobile}/>
      </div>
      <div className="main__bgGray">
        <div className="container">
          <ComoParticiparSection/>
          <BeersSection isBill={isBillLayout} isMobile={isMobile}/>
        </div>
      </div>
    </div>
  );

  const Home = () => (
    <div>
      <Header
        showSSOPopup={showSSOPopup}
        logout={() => logout()}
        userData={userData}
        user={user}/>
      <div className="mt-12">
        <div className="container">
          <StartSection/>
        </div>
      </div>
      <div className="main__bgCircle">
        <div className="container">
          <PointsSection isMobile={isMobile}/>
        </div>
      </div>
      <div className="main__bgBlue">
        <div className="container">
          <PrizesSection isMobile={isMobile}/>
        </div>
      </div>
      <div>
        <div className="container">
          <MarketPlaceSection/>
          <BeersSection isMobile={isMobile}/>
        </div>
      </div>
    </div>
  )

  return (
    (
      <div className="main d-flex align-items-start">
        {
          !userDate ?
            <Agegate saveBirthDate={() => saveBirthDate()}/>
            : null
        }
        {
          <Home></Home>
        }
        <FooterSection isMobile={isMobile}/>
      </div>
    )
  )

}

ReactDOM.render(<Index/>, document.getElementById("index"));
