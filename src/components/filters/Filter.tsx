import { FC, useEffect, useState } from 'react';
import './Filter.scss'
import { IFlights } from '../../types/flights';

interface FilterItemProps {
  data: IFlights[]
  setFilter: (any: object) => void
}

const Filter: FC<FilterItemProps> = ({data, setFilter}) => {
  // Место отправления и назначения
  // const [depart, setDepart] = useState<string>('')
  // const [arrive, setArrive] = useState<string>('')
  // Сортировка по цене и времени в пути
  const [sortValue, setSortValue] = useState<string>('priceup')
  // Фильтр с пересадкой или без
  const [oneStopValue, setOneStopValue] = useState<boolean>(false)
  const [withoutStopsValue, setWithoutStopsValue] = useState<boolean>(false)
  // Цена от и до
  const [priceFromValue, setPriceFromValue] = useState<number | null>(null)
  const [priceToValue, setPriceToValue] = useState<number | null>(null)
  // Список авиакомпаний
  const [avioValue, setAvioValue] = useState<string[]>([])


  useEffect(() => {
    setFilter({
      // depart,
      // arrive,
      sortValue,
      oneStopValue,
      withoutStopsValue,
      priceFromValue,
      priceToValue,
      avioValue
    })
  }, [avioValue, oneStopValue, priceFromValue, priceToValue, setFilter, sortValue, withoutStopsValue])
  
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue(event?.target.value)
  }
  const checkboxHandler = (value: string) => {
    if (value === 'stop') setOneStopValue(!oneStopValue)
    if (value === 'withoutStops') setWithoutStopsValue(!withoutStopsValue)
  }
  const priceHandler = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'priceFrom') setPriceFromValue(+event.target.value)
    if (type === 'priceTo') setPriceToValue(+event.target.value)
  }
  const avioHandler =  (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setAvioValue(avioValue => [...avioValue, event.target.value])
    } else {
      setAvioValue(avioValue => avioValue.filter(item => item !== event.target.value))
    }
  }

  // const airportsFrom = [...new Set(data.map(item => item.flight.legs[0].segments[0].departureAirport.caption))]
  // const airportsTo = [...new Set(data.map(item => item.flight.legs[0].segments.at(-1)?.arrivalAirport.caption))] 
  const airlines = [...new Set(data.map(item =>[...item.flight.legs.map(item => [...item.segments.map(item => item.airline.caption)])]).flat(2))]

  return (
    <div className='filter'>
      {/* <div className="filter__search search">
        <input className='search__input' type="text" list='listFrom' placeholder='Место отправления' value={depart} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepart(e.target.value)}/>
        <datalist id='listFrom'>
          {
            airportsFrom.map((item, i) => 
              // uuid больше не поддерживается в react?
                <option key={i} value={item}></option>
            )
          }
        </datalist>
        <input className='search__input' type="text" list='listTo' placeholder='Место Прибытия' value={arrive} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setArrive(e.target.value)}/>
        <datalist id='listTo'>
          {
            airportsTo.map((item, i) => 
            <option key={i} value={item}></option>
            )
          }
        </datalist>
      </div> */}
      <div className="filter__sort sort filter__items">
        <h2 className='sort__title'>Сортировать</h2>
        <input 
            className='sort__input filter__item' 
            name='sort' 
            id='priceup' 
            type="radio" 
            value='priceup' 
            checked={sortValue === 'priceup' ? true : false} 
            onChange={radioHandler}/>
        <label className='sort__label filter__item' htmlFor="priceup"> - по возрастанию цены</label>
        <br />
        <input 
            className='sort__input filter__item' 
            name='sort' 
            id='pricedown' 
            type="radio" 
            value='pricedown' 
            checked={sortValue === 'pricedown' ? true : false} 
            onChange={radioHandler}/>
        <label className='sort__label filter__item' htmlFor="pricedown"> - по убыванию цены</label>
        <br />
        <input 
            className='sort__input filter__item' 
            name='sort' 
            id='time' 
            type="radio" 
            value='time' 
            checked={sortValue === 'time' ? true : false} 
            onChange={radioHandler}/>
        <label className='sort__label filter__item' htmlFor="time"> - по времени в пути</label>
      </div>

      <div className="filter__filtred filtred filter__items">
        <h2 className='filtred__title'>Фильтровать</h2>
        <input 
            className='filtred__input filter__item'
            type="checkbox" 
            name="filter" 
            id="stops" 
            onChange={() => checkboxHandler('stop')}/>
        <label className='filtred__label filter__item' htmlFor="stops"> - 1 пересадка</label>
        <br />
        <input 
            className='filtred__input filter__item'
            type="checkbox" 
            name="filter" 
            id="straight"
            onChange={() => checkboxHandler('withoutStops')} />
        <label className='filtred__label filter__item' htmlFor="straight"> - без пересадок</label>
      </div>

      <div className="filter__price price filter__items">
        <h2 className='price__title'>Цена</h2>
        <label className='price__label filter__item' htmlFor="priceFrom">От</label>
        <input 
            className='price__input filter__item' 
            id='priceFrom' 
            type="number"
            onChange={(event) => priceHandler(event, 'priceFrom')} />
        <br />
        <label className='price__label filter__item' htmlFor="priceTo">До </label>
        <input 
            className='price__input filter__item' 
            id='priceTo' 
            type="number"
            onChange={(event) => priceHandler(event, 'priceTo')} />
      </div>

      <div className="filter__company company filter__items">
        <h2 className='company__title'>Авиакомпании</h2>
        {airlines.sort().map((item, i) => 
          <div key={i}>
            <input 
                className='company__input filter__item'
                type="checkbox" 
                name="avio" 
                id={item}
                value={item}
                onChange={(e) => avioHandler(e)}
                />
            <label className='company__label filter__item' htmlFor={item}>&nbsp;&nbsp;{item}</label>
          </div>
          )
        }
      </div>

    </div>
  )
}

export default Filter