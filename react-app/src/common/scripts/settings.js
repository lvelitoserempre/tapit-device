i18next.init({
    lng: 'es',
    resources: {
        es: {
            translation: {
                BillLayout: {
                    Active: true,
                    Header: {
                        Logo: '../assets/images/billLayout/Tapit_Logo.svg',
                        LogoPolas: '../assets/images/billLayout/PloasLogo.svg',
                        UrlLogin: '/app/login',
                        UrlSignup: '/app/signup',
                        LoginText: 'Inicia sesión',
                        SignupText: 'Regístrate'
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
                        ButtonUrl: '/app/login'
                    },
                    SectionEvents: {
                        Title: 'Pon las polas y nosotros te damos experiencias exclusivas',
                    }
                },
                Header: {
                    Logo: '../assets/images/TopLogo.png'
                },
                Section1: {
                    Title: '<span>La app que premia a los</span> amantes de la cerveza',
                    Text: 'Descarga Tap it y acumula puntos, solo por tomar cerveza ¡Es muy fácil!',
                    Button: 'DESCARGA TAP IT',
                    Image: '../assets/images/phone-start-section.png',
                    BubbleTop: '../assets/images/TopBubble.svg',
                    BubbleBottom: '../assets/images/BottomBubble.svg'
                },
                Section2: {
                    Title: '¿Cómo sumo puntos?',
                    Points: [
                        {
                            Title: '<span>Así acumulas</span> puntos con Tap it',
                            Text: 'Compra un six pack de tu cerveza favorita y escanea el código QR que encontrarás adentro.',
                            Image: '../assets/images/slider/phone-slide1.png'
                        },
                        {
                            Title: '<span>Así acumulas</span> puntos con Tap it',
                            Text: 'Invita a tus amigos a que descarguen y usen Tap it',
                            Image: '../assets/images/slider/phone-slide2.png'
                        },
                        {
                            Title: '<span>Así acumulas</span> puntos con Tap it',
                            Text: 'Pide tu cerveza en línea, desde la comodidad de tu casa',
                            Image: '../assets/images/slider/phone-slide3.png'
                        }
                    ]
                },
                Section3: {
                    Title: '<span>Entre más cerveza tomes,</span> mejores premios',
                    Text: 'Accede a beneficios exclusivos como más cerveza, experiencias y productos de tu marca favorita.',
                    Image: '../assets/images/benefits/phone-prizes.png',
                    IconList: [
                        '../assets/images/benefits/icon-beers.svg',
                        '../assets/images/benefits/icon-Tickets.svg',
                        '../assets/images/benefits/icon-Dinner.svg',
                        '../assets/images/benefits/icon-Cap.svg'
                    ],
                    Lines: [
                        '../assets/images/benefits/verticalLine.svg',
                        '../assets/images/benefits/horizontalLine.svg',
                        '../assets/images/benefits/horizontalLine2.svg',
                        '../assets/images/benefits/bottomLine.svg'
                    ]
                },
                Section4: {
                    Title: 'Compra tus cervezas y <span>productos de tus marcas favoritas</span>',
                    Image: '../assets/images/marketplace/Truck.png',
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
                    LeftPhone: '../assets/images/download/leftPhone.png',
                    RightPhone: '../assets/images/download/rightPhone.png',
                    appStore: '../assets/images/download/appStore.svg',
                    googlePlay: '../assets/images/download/googlePlay.svg',
                    appStoreUrl: '#',
                    googlePlayUrl: '#',
                    Disclaimer: 'Prohíbase el expendio de bebidas embriagantes a personas menores de edad.<br/> El exeso de alcohol es perjudicial para la salud'
                },
                Footer: {
                    TextFollow: 'Siguenos en:',
                    Social: [
                        {
                            Image: '../assets/images/footer/logo-facebbok.svg',
                            Url: 'https://www.facebook.com/gettap.it/'
                        },
                        {
                            Image:'../assets/images/footer/logo-instagram.svg',
                            Url: 'https://www.instagram.com/tapit_beer/'
                        }
                    ],
                    LegalImage: '../assets/images/footer/legal.png',
                    Logo: '../assets/images/footer/Logo-tapit.svg',
                    LogoPolas: '../assets/images/footer/logo-polas.svg',
                    Copyright: 'Todos los derechos reservados © 2020 <br/><a href="https://home.gettap.it/terminosPokerRoja" target="_blank">Términos y Condiciones</a> | <a href="https://home.gettap.it/datos" target="_blank">Políticas de protección de datos personales</a> <br/><a href="https://home.gettap.it/privacidad" target="_blank">Aviso de privacidad</a> | <a href="https://home.gettap.it/cookies" target="_blank">Política de Cookies</a> | <a href="mailto:hello@gettap.it">Contáctanos</a>'
                },
                Animations,
                Redirection: [
                    "/",
                    "/app",
                    "/tyc",
                ],
                TagManagerDev: 'GTM-NFCC7RC',
                TagManagerProd: '',
                PordEnvironment: 'https://tapit.com.co'
            }
        }
    }
}, function(err, t) {
});