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
    const [interval5s, setInterval5s] = useState(0);

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
        clearInterval(interval3s);
          
          const newInterval = setInterval(function(){
            setPoints(prevPoints => prevPoints +1*k)
            console.log('+ печенька после перезагрузки либо изменения k')
        }, 3000);
        setInterval3s(newInterval);

        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class')

      }
      if (JSON.parse(localStorage.getItem('activeStatusFarm')) === true){
        clearInterval(interval5s);
        const newInterval2 = setInterval(function(){
            setPoints(prevPoints => prevPoints +10*k)
          }, 5000);
        setInterval5s(newInterval2);
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
      }
    }, [k, setInterval3s]);

    function upgrade(){         //Увеличивает весьдоход в 2 раза
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
    
    function interval1s(){     // Дает печеньки раз в 3 секунды
      clearInterval(interval3s);
      if( points >= 15){
          setPoints(prevPoints => prevPoints - 15)
          const newInterval = setInterval(function(){
            setPoints(prevPoints => prevPoints +1*k)
            console.log('+1 печенье раз в 3 секунды')
        }, 3000);

        setInterval3s(newInterval);
        
        setButtonDisabledGrandma(true);
        setButtonClassGrandma('btn-class-disabled');
        setActiveGrandma('Приобретено');
        setActiveClassGrandma('active-class');
        localStorage.setItem('activeStatusGrandma',JSON.stringify(true)) 
    } 
    }

    function interval5sec(){    // Дает печеньки раз в 5 секунд
      clearInterval(interval5s);
      if( points >= 30){
        setPoints(prevPoints => prevPoints - 30)
          const newInterval2 = setInterval(function(){
            setPoints(prevPoints => prevPoints +10*k)
        }, 5000);
        setInterval5s(newInterval2);
        setButtonDisabledFarm(true);
        setButtonClassFarm('btn-class-disabled');
        setActiveFarm('Приобретено');
        setActiveClassFarm('active-class');
        localStorage.setItem('activeStatusFarm',JSON.stringify(true))
      }
    }

  
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
        <button onClick={interval5sec} disabled={buttonDisabledFarm}  className={buttonClassFarm}> Ферма печенек </button>
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