import { useState, useEffect } from 'react';

import Header from '../components/header.jsx';
import Body from '../components/body.jsx';

import { UserTracker } from '../tasks.js';

function Home(props){
  
  useEffect(()=>{props.taskTracker() ;}, [])
  return(<div>
    <Header
    date= {props.date}
    todayTracker= {props.todayTracker}/>
    <Body 
    todayTracker= {props.todayTracker}/>
  </div>);
}
export default Home;