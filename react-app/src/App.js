import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/home.jsx';
import Tasks from './pages/tasks.jsx';

axios.defaults.baseURL= 'http://localhost:8080/api';
axios.defaults.withCredentials= true;

function App(){
  const [date, setDate ]= useState({});
  const [todayTracker, setTodayTracker]= useState({
    date: '',
    todoL: [['', '', ''], ['', '','']]} );
  const [dateTracker, setDateTracker]= useState({
    date: '',
    todoL: [['', '', ''], ['', '','']]});
  
  const taskTracker= async (day, month, year)=>{
    if (day){
      const { data }= await axios.get(`${day}/${month}/${year}`);
    setDateTracker(data);
    }else{
      const { data }= await axios.get('today');
      setTodayTracker(data);
    }
  };
  
  useEffect( ()=>{
    const getDate= async ()=>{
    const { data }= await axios.get('/date');
    
    setDate(data);
  };
  getDate()
  }, []);
  
  return (<Router>
  <Routes>
    <Route 
      path="/"
      element={ <Home date= {()=>(date)} 
      taskTracker= {taskTracker}
      todayTracker={()=>(todayTracker)}/>}
    />
    <Route
      path="/tasks"
      element={ <Tasks date= {()=>(date)}
      taskTracker={taskTracker}
      setDateTracker= {setDateTracker}
      dateTracker={()=>(dateTracker)}
      todayTracker={()=>(todayTracker)}/>}
    />
  </Routes>
  </Router>);
}
export default App;