import { FC } from 'react'
import { IFlight } from '../../types/flight'

interface MainItemProps {
   data: IFlight
   type: string
}

const MainItemBody: FC<MainItemProps> = ({data, type}) => {
   const padTo2Digits = (num: number): string => {
      return num.toString().padStart(2, '0')
    }
   const dateParser = (date: string | undefined, format: string): string | undefined => {
      if (date === undefined) return 'Bad data'
      if (format === 'HHMM') {
         const newDate = new Date(date)
         return `${padTo2Digits(newDate.getHours())} : ${padTo2Digits(newDate.getMinutes())}`
      } 
      if (format === 'DDMMMM') {
         const newDate = new Date(date)
         return `${padTo2Digits(newDate.getDate())} ${newDate.toLocaleDateString('default', {month: 'short'})} ${newDate.toLocaleString('default', {weekday: 'short'})}`
      }
   }
   const durationParser = (duration: number | undefined): string | undefined => {
      if (duration === undefined) return 'Bad data'
      const minutes = duration % 60
      const hours = Math.floor(duration / 60)
    
      return `${padTo2Digits(hours)} ч ${padTo2Digits(minutes)} мин`
   }
   const dataType = (type: string): number => {
      if (type === 'there') {
         return 0
      } else {
         return -1
      }
   }

  return (
   <div className="item__body body">
         <div className="body__path path">
            <div className="path__location">
               {
                  `${data?.legs?.at(dataType(type))?.segments.at(0)?.departureCity?.caption},
                  ${data?.legs?.at(dataType(type))?.segments.at(0)?.departureAirport?.caption} `
               }
               <span>({data?.legs?.at(dataType(type))?.segments.at(0)?.departureAirport?.uid})</span>
            </div>
            <span className="path__arrow">&nbsp;→&nbsp;</span>
            <div className="path__location">
               {
                  `${data?.legs?.at(dataType(type))?.segments.at(-1)?.arrivalCity?.caption},
                  ${data?.legs?.at(dataType(type))?.segments.at(-1)?.arrivalAirport?.caption} `
               }
               <span>({data?.legs?.at(dataType(type))?.segments.at(-1)?.arrivalAirport?.uid})</span>
            </div>
         </div>
         <div className="divider"></div>
         <div className="body__date date">
            <div className="date__wrapper">
               <div className="date__hours">{`${dateParser(data?.legs?.at(dataType(type))?.segments.at(0)?.departureDate, 'HHMM')}`}</div>
               <div className="date__day">{`${dateParser(data?.legs?.at(dataType(type))?.segments.at(0)?.departureDate, 'DDMMMM')}`}</div>
            </div>
            <div className="date__duration">{durationParser(data?.legs?.at(dataType(type))?.duration)}</div>
            <div className="date__wrapper">
               <div className="date__day">{`${dateParser(data?.legs?.at(dataType(type))?.segments.at(-1)?.arrivalDate, 'DDMMMM')}`}</div>
               <div className="date__hours">{`${dateParser(data?.legs?.at(dataType(type))?.segments.at(-1)?.arrivalDate, 'HHMM')}`}</div>
            </div>
         </div>
         <div className="body__segments">{data?.legs[0]?.segments.length > 1 ? '1 пересадка' : 'без'}</div>
      <div className="body__airpline">
         {
            `Рейс выполняет: 
            ${data?.legs?.at(dataType(type))?.segments?.at(0)?.airline.caption}`
         }
      </div>
   </div>
  )
}

export default MainItemBody