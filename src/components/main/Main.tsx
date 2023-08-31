import { FC, useEffect, useState } from 'react'
import MainItem from '../mainItems/MainItem'
import { IFlights } from '../../types/flights';
import './Main.scss'

interface MainProps {
   data: IFlights[]
   getFilter: getFilter
}

interface getFilter {
   // depart: string
   // arrive: string
   sortValue: string
   oneStopValue: boolean
   withoutStopsValue: boolean
   priceFromValue: string
   priceToValue: string
   avioValue: string[]
}

const Main: FC<MainProps> = ({data, getFilter}) => {
   // Задать оффсет для отрисовки элементов
   const offsetValue = 10
   const [offset, setOffset] = useState<number>(offsetValue)
   const [dataItems, setDataItems] = useState<any[]>([])

   const showMore = () => {
      setOffset(offset => offset + offsetValue)
   }
      
   useEffect(() => {
      if (getFilter?.avioValue?.length === 0) {
         sortFunc(data)
      } else {
         sortFunc(dataItems)
      }
      avioFunc(data)
      filterFunc(dataItems)
      priceFunc()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, getFilter, offset])

   // Сортировка по возрастанию / убыванию цены
   const sortFunc = (dataItem: IFlights[]) => {
      let dataArr: IFlights[] = []
      if (getFilter.sortValue === "priceup") {
         dataArr = [...dataItem.sort((a, b) => Number(a.flight?.price?.total?.amount) - Number(b.flight?.price?.total?.amount))]
         setDataItems(dataArr.splice(0, offset))
      }
      if (getFilter.sortValue === "pricedown") {
         dataArr = [...dataItem.sort((a, b) => Number(b.flight?.price?.total?.amount) - Number(a.flight?.price?.total?.amount))]
         setDataItems(dataArr.splice(0, offset))
      }
      if (getFilter.sortValue === "time") {
         dataArr = [...dataItem.sort((a, b) => Number(a.flight?.legs[0].duration) - Number(b.flight?.legs[0].duration))]
         setDataItems(dataArr.splice(0, offset))
      }
      return dataArr
   }
      
   // Фильтр по Авиакомпаниям
   const avioFunc = (dataItem: IFlights[]) => {
      let dataArr: IFlights[] = []
      if (getFilter?.avioValue?.length > 0) {
         dataArr = [...dataItem.filter(item => getFilter.avioValue.some(val => item.flight.legs[0].segments[0].airline.caption === val))]
         sortFunc(dataArr)
         filterFunc(dataArr)
      }
   }
      
   // Фильтрация по остановкам
   const filterFunc = (dataItem: IFlights[]) => {
      let dataArr: IFlights[] = []
      if (getFilter.oneStopValue && !getFilter.withoutStopsValue) {
         dataArr = [...dataItem.filter(item => item.flight.legs[0].segments.length > 1)]
         setDataItems(dataArr)
      }
      if (getFilter.withoutStopsValue && !getFilter.oneStopValue) {
         dataArr = [...dataItem.filter(item => item.flight.legs[0].segments.length === 1)]
         setDataItems(dataArr)
      }
   }

   // Сортировка по цене
   const priceFunc = () => {
      let dataArr: IFlights[] = []
      if (+getFilter?.priceFromValue > 0 && +getFilter?.priceToValue > 0) {
         dataArr = [...data.filter(item => item.flight.price.total.amount <= getFilter.priceToValue && item.flight.price.total.amount >= getFilter.priceFromValue)]
         sortFunc(dataArr)
         avioFunc(dataArr)
      }
      if (+getFilter?.priceFromValue > 0 && +getFilter?.priceToValue === 0) {
         dataArr = [...data.filter(item => item.flight.price.total.amount >= getFilter.priceFromValue)]
         sortFunc(dataArr)
         avioFunc(dataArr)
      }
      if (+getFilter?.priceToValue > 0 && +getFilter?.priceFromValue === 0) {
         dataArr = [...data.filter(item => item.flight.price.total.amount <= getFilter.priceToValue)]
         sortFunc(dataArr)
         avioFunc(dataArr)
      }
   }

  return (
    <div className="main">
       <div className='main__items'>
         { dataItems.length === 0
            ?
               <h1 className='main__error'>Нет результатов</h1>
            :
            <>
               { dataItems.map((item, i) =>
                     <MainItem key={i} data={item.flight}/>
               )}
               <button onClick={() => showMore()} className='main__button'>Показать еще</button>
            </>
         }
       </div>
    </div>
  )
}

export default Main