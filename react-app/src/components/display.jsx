import { useState } from 'react';
import uuid from 'react-uuid';


function Display(props){
  const [task, setTask]= useState('+ tasks to add');
  
  return(<div className='display'>
    <div>
      <select name='tasks' id='tasks' onChange={(e)=>(setTask(e.target.value))}>
      {props.todayTracker().todoL.map( (item)=>(<option key={uuid()} value={item[0]} >{item[0]}</option>) )}
      </select>
      {props.todayTracker().todoL.filter( (item)=>(item.includes(task)) ).map( (item)=>(<span key={uuid()} className='time'>{item[1]}:{item[2]}</span>) )}
    </div>
  </div>)
};
export default Display