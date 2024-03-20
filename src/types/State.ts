import { Airbnb } from './Airbnb'
import { Bounds } from './LatLng'
import { Place } from './Place'
import { UserInfo } from './User'
import { ForecastDay, Weather, WeatherForecast } from './Weather'

export type RootState = {
	maps: GoogleMapsApiState
	travelAdvisor: TravelAdvisorApiState
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
