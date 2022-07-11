import axios from 'axios';
import Kebab from '../images/kebab.svg';
import HamburgerMenu from '../images/hamburger-menu.svg';
import Display from './display.jsx';


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


function Header(props){
  
  const {day, dayNo, month, year}= props.date();
  
  const currentDate= (dayNo)?`${dayOWeek[day]} ${months[month -1]} ${dayNo}, ${year}` : '';
  
  return(<div className="header">
    <img src={HamburgerMenu} alt='menu' className='menu'/>
    <span className='date'>{(currentDate)&&(currentDate)}</span>
    <img src={Kebab} alt='options' className='options'/>
    <Display 
    todayTracker= {props.todayTracker}/>
  </div>);
}
export default Header;