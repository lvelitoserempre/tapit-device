i18next.init({
    lng: 'es',
    resources: {
        es: {
            translation: {
                BillLayout: {
                    Active: true,
                    Header: {
                        Logo: '../assets/images/tap-it_black-orange.svg',
                        LogoPolas: '../assets/images/billLayout/PloasLogo.svg',
                        UrlLogin: '/app/auth/login',
                        UrlSignup: '/app/auth/signup',
                        LoginText: 'INICIA SESIÓN',
                        SignupText: 'Regístrate',
                        IconClose: '../assets/images/ic_close.svg'
                    },
                    Section1: {
                        Title: 'Tapit y Polas Recargadas te traen experiencias increíbles',
                        Text: 'Ahora tus facturas de cerveza pueden llevarte a experiencias digitales en vivo para que las disfrutes en casa.',
                        Image: '../assets/images/billLayout/beer-phone.png',
                        ImageScroll: '../assets/images/scroll.svg'
                    },
                    Section2: {
                        Title: '¿Cómo Participar?​',
                        Text: 'Por compras de mínimo <b>6 cervezas</b> de las marcas de Bavaria realizadas en establecimientos de Grupo Éxito, Olímpica, Cencosud, o a través de Merqueo o Rappi <b>podrás obtener acceso a eventos exclusivos.</b>',
                        Image: '../assets/images/billLayout/participa.png',
                        ButtonText: 'PARTICIPA',
                        ButtonUrl: '/app/auth/login'
                    },
                    SectionEvents: {
                        Title: 'Pon las polas y nosotros te damos experiencias exclusivas',
                    }
                },
                Header: {
                    Logo: '../assets/images/tapit-logo.png'
                },
                Section1: {
                    Title: '<span>La app que premia a los</span> amantes de la cerveza',
                    Text: 'Descarga Tapit y acumula puntos, solo por tomar cerveza ¡Es muy fácil!',
                    Button: 'DESCARGA TAPIT',
                    Image: '../assets/images/beer-lovers.png',
                    BubbleTop: '../assets/images/TopBubble.svg',
                    BubbleBottom: '../assets/images/BottomBubble.svg'
                },
                Section2: {
                    Title: '¿Cómo sumo puntos?',
                    Points: [
                        {
                            Title: '<span>Así acumulas</span></br>puntos con Tapit',
                            Text: 'Compra un six pack de tu cerveza favorita y escanea el código QR que encontrarás adentro.',
                            Image: '../assets/images/slider/phone-slide1.png'
                        },
                        {
                            Title: '<span>Así acumulas</span></br>puntos con Tapit',
                            Text: 'Invita a tus amigos a que descarguen y usen Tapit',
                            Image: '../assets/images/slider/phone-slide2.png'
                        },
                        {
                            Title: '<span>Así acumulas</span></br>puntos con Tapit',
                            Text: 'Pide tu cerveza en línea, desde la comodidad de tu casa',
                            Image: '../assets/images/slider/phone-slide3.png'
                        }
                    ]
                },
                Section3: {
                    Title: '<span>Entre más cerveza tomes,</span> mejores premios',
                    Text: 'Accede a beneficios exclusivos como más cerveza, experiencias y productos de tu marca favorita.',
                    Image: '../assets/images/benefits/rewards.png',
                    IconList: [
                        '../assets/images/benefits/icon-beers.svg',
                        '../assets/images/benefits/icon-Tickets.svg',
                        '../assets/images/benefits/icon-Dinner.svg',
                        '../assets/images/benefits/icon-Cap.svg'
                    ],
                    Lines: [
                        '../assets/images/benefits/decal.svg',
                        '../assets/images/benefits/horizontalLine.svg',
                        '../assets/images/benefits/horizontalLine2.svg',
                        '../assets/images/benefits/bottomLine.svg'
                    ]
                },
                Section4: {
                    Title: '<span>Compra tus cervezas y productos</span></br> de tus marcas favoritas',
                    Image: '../assets/images/marketplace/favorite-brands.svg',
                },
                Section5: {
                    Title: 'Nuestras Marcas',
                    BeersImages: [
                        '../assets/images/beers/beer-Aguila.png',
                        '../assets/images/beers/beer-Poker.png',
                        '../assets/images/beers/beer-Club.png',
                        '../assets/images/beers/beer-Corona.png',
                        '../assets/images/beers/beer-Bud.png',
                        '../assets/images/beers/beer-Stella.png',
                        '../assets/images/beers/beer-Redds.png',
                        '../assets/images/beers/beer-Pilsen.png',
                        '../assets/images/beers/beer-Costenita.png',
                    ]
                },
                Section6: {
                    Title: 'Descarga la app',
                    Subtitle: 'Para verdaderos amantes de la cerveza',
                    LeftPhone: '../assets/images/download/leftPhone.png',
                    RightPhone: '../assets/images/download/rightPhone.png',
                    appStore: '../assets/images/download/appStore.svg',
                    googlePlay: '../assets/images/download/googlePlay.svg',
                    appStoreUrl: 'https://apps.apple.com/us/app/tapit/id1481852424?ls=1',
                    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.abinbev.tapit',
                    Disclaimer: 'O escanea este código QR con tu teléfono móvil para descargar la app.',
                    QrCode: '../assets/images/download/onlink_to_9mttry.svg',
                    ButtonImg: '../assets/images/download/spotlight-icon.png',
                    ButtonText: 'Descargar app',
                    BobileDevices: '* Disponible únicamente para dispositivos móviles'
                },
                Footer: {
                    TextFollow: 'Siguenos en',
                    Social: [
                        {
                            Image: '../assets/images/footer/facebook-logo.svg',
                            Url: 'https://www.facebook.com/gettap.it/',
                            Name: 'Facebook'
                        },
                        {
                            Image: '../assets/images/footer/instagram-logo.svg',
                            Url: 'https://www.instagram.com/tapit_beer/',
                            Name: 'Instagram'
                        }
                    ],
                    TextTapit: 'Acerca de Tapit',
                    LegalImage: '../assets/images/footer/legal.png',
                    Logo: '../assets/images/footer/tap-it_black-orange.svg',
                    LogoPolas: '../assets/images/footer/logo-polas.svg',
                    Copyright: 'Todos los derechos reservados © 2020',
                    Links: [
                        {
                            Name: 'E-Mail: info@tapit.com.co',
                            Url: 'mailto:info@tapit.com.co'
                        },
                        {
                            Name: 'Aviso de privacidad',
                            Url: '/privacy.html'
                        },
                        {
                            Name: 'Política de Cookies',
                            Url: '/cookies.html'
                        },
                        {
                            Name: 'Políticas de protección de datos personales',
                            Url: '/data-proteccion.html'
                        },
                        {
                            Name: 'Términos y Condiciones',
                            Url: '/terms.html'
                        }
                    ],
                    Support: {
                        Title: 'Soporte',
                        Phone: 'Teléfono: 3158220232',
                        Contact: {
                            Text: 'Contáctanos',
                            Url: 'https://draftline.typeform.com/to/mr1ZYDog'
                        },
                        Help: {
                            Text: 'Documento de Necesitas Ayuda',
                            Url: '/help.html'
                        },
                        Cancellation: {
                            Text: 'Políticas de cancelación',
                            Url: '/cancellation-policies.html'
                        },
                        SIC: {
                            Text: 'Superintendencia de Industria y Comercio',
                            Url: 'https://www.sic.gov.co/por-un-clic-confiable'
                        }
                    }
                },
                Animations,
                Redirection: [
                    "/",
                    "/app",
                    "/tyc",
                ],
                CookiesModal: {
                    Text: 'Utilizamos cookies para personalizar contenido y anuncios, proporcionar funciones de redes sociales y analizar nuestro tráfico. También compartimos información sobre cómo usted utiliza nuestro sitio con nuestros socios de redes sociales, de publicidad y de analítica. <a class="cookies__button" href="/privacy.html" target="_blank">Política de Privacidad</a>',
                    ButtonText: 'Aceptar',
                    ConfigurationText: '> Configuración de cookies',
                    ConfigurationUrl: '#'
                },
                TagManagerDev: 'GTM-NFCC7RC',
                TagManagerProd: 'GTM-MGL9B93',
                PordEnvironment: 'https://tapit.com.co',
                ApiUrlDev: 'https://api-dev.tapit.com.co/',
                ApiUrlProd: 'https://api.tapit.com.co/',
                EventsUrl: 'v1/list/events'
            }
        }
    }
}, function (err, t) {
});
