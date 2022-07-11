import { useState } from 'react';

const dayOWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
const months= ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function Calender(props){
  const { day, dayNo, month, year }= props.date();
  
  const [sMonth, setSMonth]= useState(month);
  const [sYear, setSYear]= useState(year);
  
  //to get empty spaces before day 1 of month
  const getDay1ofMonth = ()=>(new Date(`${sMonth}/1/${sYear}`).getDay());
  
  
  function getDaysInMonth(year, month) {
    return (new Date(year, month, 0).getDate());
  }
  function createDateListForMonth(year, month){
    const dateList= [];
    
    //to add empty spaces before day 1 of month to the list
    for (var i= 0; i < getDay1ofMonth(); i++){
      dateList.push("");
    }
    const noOfDays= getDaysInMonth(year, month);
    for (var i=1; i <= noOfDays; i++){
      dateList.push(i);
    }
    return dateList;
  }
  const changeCalender= (action)=>{
    if (action === 'add' && sMonth <= 11){
      setSMonth(sMonth +1); return;
    }else if (action === 'add' && sMonth === 12){
      setSMonth(1);
      setSYear(sYear + 1);
      return;
    }
    if (action === 'sub' && sMonth >= 2){
      setSMonth(sMonth - 1); return;
    }else if (action === 'sub' && sMonth === 1){
      setSMonth(12);
      setSYear(sYear - 1);
      return;
    }
  }
  
  return(<div className='calender'>
    <div className='calender-header'>
      <h4>{year}</h4>
      <h2>{dayOWeek[day].slice(0,3)}, {months[month-1]} {dayNo}</h2>
    </div>
    <div className='calender-body'>
      <ul>
        <li className="prev" onClick={()=>(changeCalender('sub'))}>&#10094;</li>
        <li className="next" onClick={()=>(changeCalender('add'))}>&#10095;</li>
        <li className='mid'>{months[sMonth-1]} {sYear}</li>
      </ul>
      <ul className='days'>
        {dayOWeek.map((day)=>(<li>{day.slice(0,1)}</li>))}
      </ul>
      <ul className='dayNo'>
        {createDateListForMonth(sYear, sMonth).map((date)=>(<li value= {date} onClick={(e)=>(props.setClickedDate(`${sMonth}/${e.target.value}/${sYear}`))} className={ ( `${month}/${dayNo}/${year}` === `${sMonth}/${date}/${sYear}` )? 'today each': 'each' }>{date}</li>))}
      </ul>
    </div>
  </div>)
}
export default Calender;