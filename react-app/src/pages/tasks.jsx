import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import TitleBar from '../components/title-bar.jsx';
import Calender from '../components/calender.jsx';
import Events from '../components/events.jsx';

function Tasks(props){
  
  const [clickedDate, setClickedDate]= useState(props.todayTracker().date);
  
  useEffect( ()=>(props.setDateTracker(props.todayTracker()) ), []);
  
  return(<div className='task'>
    <TitleBar title='Tracker'/>
    <Calender 
    date={props.date}
    setClickedDate= {setClickedDate} />
    <Events 
    //date={props.date}
    clickedDate={clickedDate} 
    dateTracker={props.dateTracker}/>
    
  </div>)
}
export default Tasks;