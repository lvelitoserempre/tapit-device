
const deviceWidth = window.innerWidth;
const Animations = {
    Section1: {
        BubbleTop: [
            {
                start: 0,
                end: 500,
                properties: [
                    {
                        startValue: 0,
                        endValue: -150,
                        property: 'translateY',
                    }
                ],
            },
        ],
        BubbleBottom: [
            {
                start: 0,
                end: 500,
                properties: [
                    {
                        startValue: 0,
                        endValue: -80,
                        property: 'translateY',
                    }
                ],
            },
        ],
        Bottle1: [
            {
                start: deviceWidth< 768 ? 350: 30,
                end: deviceWidth< 768 ? 370:370,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    }
                ],
            },
        ],
        Bottle2: [
            {
                start: deviceWidth< 768 ? 370:80,
                end: deviceWidth< 768 ? 390:420,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    },
                    {
                        startValue: 0,
                        endValue: 3,
                        property: 'translateX',
                    },
                ],
            },
        ],
        Bottle3: [
            {
                start: deviceWidth< 768 ? 390:130,
                end: deviceWidth< 768 ? 410:450,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    },
                    {
                        startValue: 0,
                        endValue: 6,
                        property: 'translateX',
                    },
                ],
            }
        ],
        Line: [
            {
                start: deviceWidth< 768 ? 400: 180,
                end: deviceWidth< 768 ? 600: 500,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    },
                    {
                        startValue: 0,
                        endValue: deviceWidth< 768 ? 0.26: 1,
                        property: 'scaleX',
                    },
                    {
                        startValue: 0,
                        endValue: 12,
                        property: 'translateX',
                    },
                ],
            }
        ],
        Elipse: [
            {
                start: deviceWidth< 768 ? 400: 180,
                end: deviceWidth< 768 ? 600: 500,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    },
                    {
                        startValue: 0,
                        endValue: deviceWidth< 768 ? 240: 870,
                        property: 'translateX',
                    },
                ],
            }
        ]
    },
    Section2: {
        Content: [
            {
                start: 450,
                end: 530,
                properties: [
                    {
                        startValue: 0,
                        endValue: 1,
                        property: 'opacity',
                    },
                ],
            }
        ],
        Image: [
            {
                start: deviceWidth< 768 ? 700:250,
                end: deviceWidth< 768 ? 1300:1000,
                properties: [
                    {
                        startValue: 0,
                        endValue: deviceWidth< 768 ? -50:70,
                        property: 'translateY',
                    },
                ],
            }
        ]
    }
}
        