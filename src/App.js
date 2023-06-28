import { useState } from 'react';
import './App.css';
  let i=0
  let k=1


  function App() {
    const [points, setPoints] = useState(0)
    const [k, setK] = useState(1)  
    
    function clickImg(){
      setPoints(points + k)
    }
    function upgrade(){
      if( points >= 10){
        setK(2)
      }
    }  
    
  return (
    <div className='App'>
      
      <img className='image-class' id='img-cookie' src='cookie.png' onClick={clickImg}></img>
      <div>
      <button onClick={upgrade} className='btn-class'> Апгрейд </button>
      </div>
       <div className='points-block'>
        Печеньки: {points}
        </div>
    </div>
  );
}

export default App;
