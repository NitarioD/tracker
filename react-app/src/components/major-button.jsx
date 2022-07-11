function MajorButton(props){
  const status= 'pause';
  return(<div className='major-button'>
  <button className={status}  onClick={()=>( console.log(props.todayTracker()) )}>{status}</button>
  </div>);
}
export default MajorButton;