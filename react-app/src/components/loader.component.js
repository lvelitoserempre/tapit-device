import React from "react";
import ReactDOM from "react-dom";
import Plx from 'react-plx';

export default function Loader() {

    const parallaxData = [
        {
            start: 0,
            end: 500,
            properties: [
            {
                startValue: 1,
                endValue: 2,
                property: 'scale',
            },
            ],
        },
    ];

    return (
        <Plx
            className='loader col-xs-6'
            parallaxData={ parallaxData }
        >
            /* Your content */
        </Plx>
    )
    

}