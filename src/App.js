import { useState } from 'react';
import './App.css';
  let i=0
  let k=1


function App() {

  const points = useState(0)
  

  function clickImg(){
    i=i+k
    points[1](i)
    }
  function upgrade(){
    if( i >= 10){
      k=2;
    }
  }  
    
  return (
    <div className='App'>
      
      <img className='image-class' id='img-cookie' src='cookie.png' onClick={clickImg}></img>
      <div>
      <button onClick={upgrade} className='btn-class'> Апгрейд </button>
      </div>
       <div className='points-block'>
        Печеньки: {points[0]}
        </div>
    </div>
  );
}

export default App;
