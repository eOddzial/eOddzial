import React,  { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import HintingAlgService from "../../services/HintingAlgService";

// import Scheduler from 'devextreme-react/scheduler';
//
// import { data } from './data.js';
//
// const currentDate = new Date(2021, 3, 29);
// const views = ['day', 'week', 'workWeek', 'month'];

const OperationDateSearch = () => {
    const {date} = useParams();
    var dateToShow = new Date(date);

    const [dayFillPercent, setDayFillPercent] = useState("");
    const [yearToShow, setYearToShow] = useState(dateToShow.getFullYear());
    const [monthToShow, setMonthToShow] = useState(dateToShow.getMonth());

// SETUP

    //  get date from URL
        var year = dateToShow.getFullYear();
        var month = dateToShow.getMonth();
        dateToShow.setDate(1);

    useEffect(() => {
        retriveFillment(year, month);
    }, []);

    const retriveFillment = (year, month) => {
        HintingAlgService.getYearly({
            date_year: year,
            date_month: month+1
        })
            .then((response) => {
                setDayFillPercent(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

// METHODS
    const handleYearChange = event => {
        const { value } = event.target;
        setYearToShow(value);
    };
    const handleMonthChange = event => {
        const { value } = event.target;
        setMonthToShow(value);
    };

    const yearOptions = () => {
        const dateNow = new Date();
        const year = dateNow.getFullYear();
        return (
            <select onChange={handleYearChange}>
                <option value="" selected disabled hidden>Wybierz Rok</option>
                <option value={year}>{year}</option>
                <option value={year+1}>{year+1}</option>
                <option value={year+2}>{year+2}</option>
                <option value={year+3}>{year+3}</option>
                <option value={year+4}>{year+4}</option>
                <option value={year+5}>{year+5}</option>
                <option value={year+6}>{year+6}</option>
                <option value={year+7}>{year+7}</option>
                <option value={year+8}>{year+8}</option>
                <option value={year+9}>{year+9}</option>
                <option value={year+10}>{year+10}</option>
            </select>
        );
    }

    const dayAmount = (tempDate) => {
        var amounts = [31,28,31,30,31,30,31,31,30,31,30,31]
        var amount = amounts[tempDate.getMonth()]
        if(tempDate.getMonth() === 1){
            if(tempDate.getFullYear() % 4 === 0){
                amount = 29;
            }else{
                amount = 28;
            }
        }
        return amount
    }

    const decideColor = (iterator, dayAmount, predays) =>{
    var color = "green"

    if (iterator < predays){
        color = "grey"
    }else if (iterator >= dayAmount+predays){
        color = "grey"
    }else if (dayFillPercent[iterator-predays] >= 1){
        color = "red"
    }else if (dayFillPercent[iterator-predays] > 0){
        color = "orange"
    }

    return color;
    }

    const tableBody = (date) => {
        const rows = [];
        const days = [];

        const head = (
            <thead>
                <tr>
                    <th>Niedziela</th>
                    <th>Poniedzialek</th>
                    <th>Wtorek</th>
                    <th>Sroda</th>
                    <th>Czwartek</th>
                    <th>Piatek</th>
                    <th>Sobota</th>
                </tr>
            </thead>
        );
        rows.push(head);

        var thismonthdays = dayAmount(date)

    //  Calc this month
        var predays = date.getDay();
    //     console.log(predays)
    //     var x = 6-(date.getDay()-1);
    //     var b = dayamount - x;
        var postdays = 7 - (thismonthdays - (6-(date.getDay()-1))) % 7;
    //     console.log(postdays)
        var alldays = thismonthdays + predays + postdays;

    //  Calc last month
        var lastmonth = month -1;
        var lastyear = year;
        if(lastmonth < 0){
            lastmonth = 11;
            lastyear -= 1;
        }
        var tempDate = new Date()
        tempDate.setFullYear(lastyear);
        tempDate.setMonth(lastmonth);
        tempDate.setDate(1);
        var lastmonthdays = dayAmount(tempDate)

        for(var i=predays-1; i>=0; i--){
            days.push(lastmonthdays-i);
        }
        for(i=1; i<=thismonthdays; i++){
            days.push(i);
        }
        for(i=1; i<=postdays; i++){
            days.push(i);
        }
    //     console.log(days);

        for(i=0; i < alldays/7; i++){
            rows.push(
                <tr>
                <td style={{"backgroundColor": decideColor(0+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[0+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(1+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[1+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(2+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[2+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(3+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[3+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(4+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[4+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(5+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[5+(i*7)]}</a></td>
                <td style={{"backgroundColor": decideColor(6+(i*7), thismonthdays, predays), "border": "2px black solid"}}><a href="/add_operation">{days[6+(i*7)]}</a></td>
                </tr>
            );
        }
        return (
            rows
        );
    }

    return (
        <div>
            {yearOptions()}
            <select onChange={handleMonthChange}>
                <option value="" selected disabled hidden>Wybierz Miesiac</option>
                <option value={0} >Styczen</option>
                <option value={1} >Luty</option>
                <option value={2} >Marzec</option>
                <option value={3} >Kwiecien</option>
                <option value={4} >Maj</option>
                <option value={5} >Czerwiec</option>
                <option value={6} >Lipiec</option>
                <option value={7} >Sierpien</option>
                <option value={8} >Wrzesien</option>
                <option value={9} >Pazdziernik</option>
                <option value={10} >Listopad</option>
                <option value={11} >Grudzien</option>
            </select>
            <button type="submit">
                <a href={'/operation_date_search/' +yearToShow+'-'+(parseInt(monthToShow)+1)}>Przejdz</a>
            </button>
            <table>
                {tableBody(dateToShow)}
            </table>
        </div>
    );
}

export default OperationDateSearch;