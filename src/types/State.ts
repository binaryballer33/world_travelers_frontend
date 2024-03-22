import { Airbnb } from './Airbnb'
import { FlightInfo, FlightResponse, ItineraryData } from './Flights'
import { Bounds } from './LatLng'
import { Place } from './Place'
import { UserInfo } from './User'
import { ForecastDay, Weather, WeatherForecast } from './Weather'

export type RootState = {
	maps: GoogleMapsApiState
	travelAdvisor: TravelAdvisorApiState
	priceline: PricelineApiState
	weather: WeatherApiState
	airbnb: AirbnbApiState
	user: UserApiState
}

export type WeatherApiState = {
	weather: Weather | null
	threeDayWeatherForecast: ForecastDay[]
	isFetchingForecast: boolean
}

export type TravelAdvisorApiState = {
	rating: string
	places: Place[]
	filteredPlaces: Place[]
	typeOfPlace: string
	placeClicked: number | null
	isFetchingPlaces: boolean
}

export type PricelineApiState = {
	rating: string
	data: ItineraryData[]
	filteredData: ItineraryData[]
	typeOfData: string
	dataClicked: ItineraryData | null
	isFetching: boolean
	adults: number
	departureDate: string
	returnDate: string
	originAirportCode: string
	destinationAirportCode: string
	currency: string
}

export type GoogleMapsApiState = {
	isLoaded: boolean
	loadError: string | null
	coords: google.maps.LatLngLiteral
	bounds: Bounds
	placeClicked: Place | null
	mapRef: google.maps.Map | null
}

export type AirbnbApiState = {
	airbnbs: Airbnb[]
	isFetchingAirbnbs: boolean
	filteredAirbnbs: Airbnb[]
	reviewsCount: number
	checkin: string
	checkout: string
	adults: number
	children: number
	infants: number
	pets: number
	minPrice: number
	maxPrice: number
	currency: string
}

export type UserApiState = {
	token: string
	user: UserInfo | null
}
