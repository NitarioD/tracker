import { useNavigate } from 'react-router-dom';
import BackButton from '../images/back-button.svg';

function TitleBar(props){
  const navigate= useNavigate(); 
  
  return(<div className='title-bar'>
    <img src={BackButton} alt='' className='back-button' onClick={()=>(navigate('/'))}/>
    <h2>{props.title}</h2>
  </div>)
}
export default TitleBar;