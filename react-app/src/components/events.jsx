import { useState } from 'react';

import { UserTracker } from '../tasks.js';

import Delete from '../images/delete-icon.png';
import Add from '../images/add2.svg';

const dayOWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
const months= ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function Events(props){
  const [month, dayNo, year]= props.clickedDate.split('/');
  
  return(<div className='events'>
    <div className='head'>
      <h2>Daily Activity Tracker</h2>
      <h3>{`${months[month-1]} ${dayNo} , ${year}`}</h3>
    </div>
    <div className='tasks'>{
  
    props.dateTracker().todoL.map( (each)=>(<p><div className='time-state'><span>{each[0]}</span><img src={Delete} alt='delete icon' className='delete'/></div>  <div className='time-state time-float'><span>{each[1]} hrs</span><span>{each[2]} mins</span></div></p>) ) }
    <img src={Add} alt='add button' className='sticky-add'/>
    </div>
  </div>)
}
export default Events;