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
    let interval1sid = null
    let interval5sid = null
    
    function clickImg(){
      setPoints(points + k)
      let summ = points + k
    }

    useEffect(() =>{
      if (points != 0){
      localStorage.setItem('points', JSON.stringify(points))
      }
    }, [points])
    
    useEffect(() => {
      setPoints(JSON.parse(localStorage.getItem('points')));

      if (JSON.parse(localStorage.getItem('activeStatus')) === true){
        setK(2)
        setButtonDisabled(true);
        setButtonClass('btn-class-disabled');
        setActive('Приобретено');
        setActiveClass('active-class');
      }
      if (JSON.parse(localStorage.getItem('activeStatusGrandma')) === true){
        interval1sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +1)
          }, 3000);
        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class');
      }
      if (JSON.parse(localStorage.getItem('activeStatusFarm')) === true){
        interval5sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +10)
          }, 5000);
          console.log('Нажал кнопку')
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
      }
    }, []);

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
      if( points >= 15){
          setPoints(prevPoints => prevPoints - 15)
          interval1sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +1)
        }, 3000);
        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class');
        localStorage.setItem('activeStatusGrandma',JSON.stringify(true))
      }
    }

    function interval5s(){
      if( points >= 30){
        setPoints(prevPoints => prevPoints - 30)
          interval5sid = setInterval(function(){
            setPoints(prevPoints => prevPoints +10)
        }, 5000);
          console.log('Нажал кнопку')
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
        localStorage.setItem('activeStatusFarm',JSON.stringify(true))
      }
    }

    useEffect(() => {
      return () => {
        if (interval1sid) {
          clearInterval(interval1sid);
        }
      };
    }, []);
  
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

      <div><h2>Кликай на печеньку!</h2></div>
      <img className='image-class' id='img-cookie' src={cookie} onClick={clickImg}></img>
        <div className='points-block'>
        Печеньки: {points}
        </div>
    </div>
  )
}