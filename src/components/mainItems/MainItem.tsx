import { FC } from 'react'
import { IFlight } from '../../types/flight'
import MainItemBody from './MainItemBody'

interface MainItemProps {
   data: IFlight
}


const MainItem: FC<MainItemProps> = ({data}) => {
  return (
    <div className='main__item item'>
      <div className="item__header header">
         <div className="header__logo"></div>
         <div className="header__info">
            <div className="header__price">{`${data?.price?.total?.amount} ₽`}</div>
            <span className="header__for">Стоимость для одного взрослого пассажира</span>
         </div>
      </div>
      <div className="item__inner">
        <MainItemBody data={data} type='there'/>
        <MainItemBody data={data} type='back'/>
      </div>
      <button className="item__button">Выбрать</button>
    </div>
  )
}

export default MainItem