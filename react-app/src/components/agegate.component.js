import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Agegate() {
    const [adult,setAdult] = useState(null);

    function checkAge() {
        let day = parseFloat(document.getElementById('day').value);
        let month = parseFloat(document.getElementById('month').value);
        let year = parseFloat(document.getElementById('year').value);
        let currentYear = new Date();
        let born = new Date(year, month-1, day);
        let age = get_age(born,currentYear);
        if (age < 18) {
            setAdult(false);
        } else {
            setAdult(true);
            window.localStorage.setItem('anonymousUserBirthDate',born)
        }
    }
    function get_age(born, now) {
        var birthday = new Date(now.getFullYear(), born.getMonth(), born.getDate());
        if (now >= birthday) {
            return now.getFullYear() - born.getFullYear();
        } else {
            return now.getFullYear() - born.getFullYear() - 1;
        }
    }

    return (
        <div
            className='agegate col-xs-6'
        >
            <form>
                <input type="number" maxLength="2" placeholder="DD" id="day" />
                <input type="number" maxLength="2" placeholder="MM" id="month" />
                <input type="number" maxLength="4" placeholder="AAAA" id="year" />
                {
                    adult == false?
                        <p>Debes ser mayor de 18 años para acceder a este contenido</p>
                    :
                    null
                }
                <input type="button" onClick={()=>checkAge()} value="Enviar" />
            </form>
        </div>
    )
    

}