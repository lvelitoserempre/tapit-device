import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function Agegate(props) {
    const [adult,setAdult] = useState(null);

    function checkAge() {
        let day = parseFloat(document.getElementById('day').value);
        let month = parseFloat(document.getElementById('month').value);
        let year = parseFloat(document.getElementById('year').value);
        let currentYear = new Date();
        let born = new Date(year, month-1, day);
        let age = get_age(born,currentYear);
        let dateToLocal = born.getTime();
        if(isValidDate(year, month-1, day)) {
            if (age < 18) {
                setAdult(false);
            } else if(age > 120){
                setAdult('invalid');
            } else {
                setAdult(true);
                window.localStorage.setItem('anonymousUserBirthDate',dateToLocal);
                props.saveBirthDate(dateToLocal);
            }
        } else {
            setAdult('invalid');
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
    function isValidDate(year, month, day) {
        var d = new Date(year, month, day);
        if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
            return true;
        }
        return false;
    }

    return (
        <div id='agegate' className='agegate row center-sm middle-sm'>
            <div className='agegate__content col-xs-12 col-lg-6 center-xs middle-xs row'>
                <div>
                    <p className="section__text">¡Hola!</p>
                    <p className="section__text">Por favor ingresa tu fecha de nacimiento</p>
                    <form className='agegate__form row center-xs middle-xs'>
                        <input type="text" maxLength="2" placeholder="DD" id="day" />
                        <input type="text" maxLength="2" placeholder="MM" id="month" />
                        <input type="text" maxLength="4" placeholder="AAAA" id="year" />
                        {
                            adult == false?
                                <p className="section__text col-xs-12">Debes ser mayor de 18 años para acceder</p>
                            :
                            adult == 'invalid'?
                                <p className="section__text col-xs-12">Por favor ingresa una fecha válida</p>
                            :
                            null
                        }
                        <div className="col-xs-12 center-xs">
                            <input className="section__button" type="button" onClick={()=>checkAge()} value="Enviar" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    

}