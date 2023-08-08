import { useEffect, useState } from "react"
import cookie from './cookie.webp';

export const Upgrade = () => {
  const [points, setPoints] = useState(0)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [buttonClass, setButtonClass] = useState('btn-class')
    const [buttonClassGrandma, setButtonClassGrandma] = useState('btn-class')
    const [buttonClassFarm, setButtonClassFarm] = useState('btn-class')
    const [active, setActive] = useState('Не приобретено')
    const [activeClass, setActiveClass] = useState('mini-discription')
    const [activeGrandma, setActiveGrandma] = useState('Не приобретено')
    const [activeClassGrandma, setActiveClassGrandma] = useState('mini-discription')
    const [buttonDisabledGrandma, setButtonDisabledGrandma] = useState(false)
    const [activeFarm, setActiveFarm] = useState('Не приобретено')
    const [activeClassFarm, setActiveClassFarm] = useState('mini-discription')
    const [buttonDisabledFarm, setButtonDisabledFarm] = useState(false)
    const [k, setK] = useState(1)  
    const [interval3s, setInterval3s] = useState(0);

    let interval1sid = null
    let interval5sid = null
    
    function clickImg(){
      setPoints(points + k)    //Кликаем печеньку
    }

    useEffect(() =>{
      if (points != 0){
      localStorage.setItem('points', JSON.stringify(points)) //Записываем кол-во печенек в Local
      }
    }, [points])

    useEffect(() => {
      setPoints(JSON.parse(localStorage.getItem('points')));
      console.log('localStorage points = ', localStorage.getItem('points')) //Выводим 0 печенек
      if(localStorage.getItem('points') === null){
        //console.log('Локал сторэйдж равен нулл')
        setPoints(0)
      }
    }, [])
    
    useEffect(() => {       // Восстанавливаем сохранения

      if (JSON.parse(localStorage.getItem('activeStatus')) === true){
        setK(2)
        setButtonDisabled(true);
        setButtonClass('btn-class-disabled');
        setActive('Приобретено');
        setActiveClass('active-class');
      }
      if (JSON.parse(localStorage.getItem('activeStatusGrandma')) === true){
        clearInterval(interval1sid);
          
          interval1sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +1*k)
        }, 3000);
        

        /*clearInterval(interval1sid);
        interval1sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +1*k)
          }, 3000);
        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class');*/
      }
      if (JSON.parse(localStorage.getItem('activeStatusFarm')) === true){
        interval5sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +10*k)
          }, 5000);
          console.log('Нажал кнопку')
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
      }
    }, [k]);

    function upgrade(){
      if( points >= 10){
        setPoints(prevPoints => prevPoints - 10)
        setK(2)
        setButtonDisabled(true);
        setButtonClass('btn-class-disabled');
        setActive('Приобретено');
        setActiveClass('active-class');
        localStorage.setItem('activeStatus',JSON.stringify(true))
      }
    }
    
    function interval1s(){
      clearInterval(interval1sid);
      if( points >= 15){
          setPoints(prevPoints => prevPoints - 15)
          interval1sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +1*k)
        }, 3000);
        
        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class');
        localStorage.setItem('activeStatusGrandma',JSON.stringify(true))
        
    }
      
      //return () => clearInterval(myInterval3s);
    }

    function interval5s(){
      if( points >= 30){
        setPoints(prevPoints => prevPoints - 30)
          interval5sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +10*k)
        }, 5000);
          console.log('Нажал кнопку')
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
        localStorage.setItem('activeStatusFarm',JSON.stringify(true))
      }
    }

    /*function intervalHandler() {
      if (JSON.parse(localStorage.getItem('activeStatusGrandma')) === true) {
        setPoints(prevPoints => prevPoints + 1 * k);
      } else if (JSON.parse(localStorage.getItem('activeStatus')) === true) {
        setPoints(prevPoints => prevPoints + 2 * k);
      } else {
        setPoints(prevPoints => prevPoints + k);
      }
    }

    useEffect(() => {
      if (interval1sid) {
        clearInterval(interval1sid);
      }

      interval1sid = setInterval(intervalHandler, 3000);
      return () => {
        clearInterval(interval1sid);
      };
    }, [k, points]); */
  
  return(
    <div>
    <div className='class-menu'>
      <div className='Magazine-name'>Магазин</div>
      <br></br>
      <div>
        
      </div>
      
      <div>
        <button onClick={upgrade} disabled={buttonDisabled} className={buttonClass}> Изучить выгодную формулу </button>
        <div className='discription'>Удваивает приток новых монет</div>
        <div className='mini-discription'>Стоимость: 10 монет</div>
        <div className={activeClass}>{active}</div>
      </div>
      <br></br>
      <div>
        <button onClick={interval1s} disabled={buttonDisabledGrandma} className={buttonClassGrandma}> Нанять бабулю </button>
        <div className='discription'>Каждые 3 секунды продает 1 печеньку</div>
        <div className='mini-discription'>Стоимость: 15 монет</div>
        <div className={activeClassGrandma}>{activeGrandma}</div>
      </div>
      <br></br>
      <div>
        <button onClick={interval5s} disabled={buttonDisabledFarm}  className={buttonClassFarm}> Ферма печенек </button>
        <div className='discription'>Каждые 5 секунд продает 10 печенек</div>
        <div className='mini-discription'>Стоимость: 30 монет</div>
        <div className={activeClassFarm}>{activeFarm}</div>
      </div>
    </div>

      <div className="clickClass"><h2>Кликай на печеньку!</h2></div>
      <img className='image-class' id='img-cookie' src={cookie} onClick={clickImg}></img>
        <div className='points-block'>
        Печеньки: {points}
        </div>
    </div>
  )
}