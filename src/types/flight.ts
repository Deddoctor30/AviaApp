export interface IFlight {
   price: {
      total: {
         amount: string
         currency: string
         currencyCode: string
      }
   }
   legs: [{
      duration: number | undefined
      segments: [{
         departureAirport: {
            uid: string
            caption: string
         }
         departureCity: {
            uid: string
            caption: string
         }
         arrivalAirport: {
            uid: string
            caption: string
         }
         arrivalCity: {
            uid: string
            caption: string
         }
         departureDate: string
         arrivalDate: string
         airline: {
            uid: string
            caption: string
         }
      }]
   }]
}