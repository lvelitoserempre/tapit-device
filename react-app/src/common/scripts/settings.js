i18next.init({
    lng: 'es',
    resources: {
        es: {
            translation: {
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
                    Image: '../assets/images/phone-prizes.png',
                    IconList: [
                        '../assets/images/icon-beers.svg',
                        '../assets/images/icon-Tickets.svg',
                        '../assets/images/icon-Dinner.svg',
                        '../assets/images/icon-Cap.svg'
                    ],
                    Lines: [
                        '../assets/images/verticalLine.svg',
                        '../assets/images/horizontalLine.svg',
                        '../assets/images/horizontalLine2.svg'
                    ]
                },
                Section5: {
                    BeersImages: [
                        '../assets/images/beers/beer-Stella.png',
                        '../assets/images/beers/beer-Corona.png',
                        '../assets/images/beers/beer-Bud.png',
                        '../assets/images/beers/beer-Club.png',
                        '../assets/images/beers/beer-Poker.png',
                        '../assets/images/beers/beer-Redds.png',
                        '../assets/images/beers/beer-Stella.png',
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
                            Url: 'facebook.com'
                        },
                        {
                            Image:'../assets/images/footer/logo-instagram.svg',
                            Url: 'facebook.com'
                        }
                    ],
                    Logo: '../assets/images/footer/Logo-tapit.svg',
                    Copyright: 'Todos los derechos reservados © 2019 <br/>Términos y condiciones | Políticas de protección de datos personales <br/>Aviso de privacidad | Pólitica de cookies | Contáctanos '
                },
                Animations
            }
        }
    }
}, function(err, t) {
});