import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route} from "react-router-dom";
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
import ModalSso from "./../components/sso.component";

export default function Index() {
  const [isMobile, setMobile] = useState(null);
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  const [userDate, setUserDate] = useState(null);
  const [ssoClient, setSsoClient] = useState(null);
  const [userData, setUserData] = useState(null);
  const config = window.location.origin == i18next.t("PordEnvironment") ? TAPIT_CONFIG_PROD : TAPIT_CONFIG_DEV;
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
    if(!ssoClient) {
        setSsoClient(new SsoClient(config.clientConfig, config.ssoConfig));
    } else {
        ssoClient.init();
    }
  }, [ssoClient]);


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

  config.clientConfig.ssoActionListener = function (action, data) {
    switch (action) {
      case 'set-logged-user':
        if (data) {
          document.getElementById('login-popup').classList.add('hidden');
          signInWithCustomToken(data.customToken);
        } 
        break;

      case 'close-popup':
        document.getElementById('login-popup').classList.add('hidden');
        break;
    }
  }


  if (!firebase.apps.length) {
      firebase.initializeApp(config.firebaseConfig);
  }

  firebase.auth().onAuthStateChanged(function (userCredential) {
    if (userCredential) {
      firebase.firestore().collection('user_account_tap').doc(userCredential.uid).get()
        .then(function (documentSnapshot) {
          let user = documentSnapshotToObject(documentSnapshot)
          if(!userData) {
            setUserData(user);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });

  function signInWithCustomToken(customToken) {
    firebase.auth().signInWithCustomToken(customToken)
      .then(userCredential => {
        let url = window.location.origin == i18next.t("PordEnvironment")? i18next.t("MarketProdUrl"): i18next.t("MarketDevUrl")
        window.location.href = url + '?customToken='+customToken;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function documentSnapshotToObject(documentSnapshot) {
    const object = documentSnapshot.data() || {};
    object.id = documentSnapshot.id;

    for (const objectKey in object) {
      if (object.hasOwnProperty(objectKey)) {
        if (object[objectKey] instanceof firebase.firestore.Timestamp) {
          object[objectKey] = object[objectKey].toDate()
        }

        if (object[objectKey] instanceof firebase.firestore.DocumentReference) {
          object[objectKey] = object[objectKey].id;
        }
      }
    }

    return object;
  }

  function showSSOPopup(path) {
    const loginElement = document.getElementById('login-popup');
    ssoClient.ssoExecuteAction('navigateTo', path);
    loginElement.classList.remove('hidden');
  }
  function logout() {
    ssoClient.ssoExecuteAction('logout');
    firebase.auth().signOut().then(function () {
      setUserData(null);
    });
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
      showSSOPopup={()=>showSSOPopup()}
      logout={()=>logout()}
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
          <HashRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/polas-recargadas" component={BillLayout}/>
          </HashRouter>
        }
        <FooterSection isMobile={isMobile}/>
        <ModalSso/>
      </div>
    )
  )

}

ReactDOM.render(<Index/>, document.getElementById("index"));
