import { useNavigate } from 'react-router-dom';
import MajorButton from './major-button.jsx';
import Add from '../images/add.svg';
function Body(props){
  
  const navigate= useNavigate();
  
  const handleClick= ()=>{
    navigate('/tasks');
  }
  return(<div className='contain-body'>
    <MajorButton 
    todayTracker={props.todayTracker}/>
    <div className='add' onClick={handleClick}>
      <img src={Add} alt='add button' className='add-button'/>
      <span>tasks</span>
    </div>
  </div>)
}
export default Body;