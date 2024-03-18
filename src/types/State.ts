import { Bounds } from './LatLng'
import { Place } from './Place'
import { Weather, WeatherForecast } from './Weather'

export type RootState = {
	maps: GoogleMapsApiState
	travelAdvisor: TravelAdvisorApiState
	weather: WeatherApiState
	user: User
}

export type WeatherApiState = {
	weather: Weather | null
	threeDayWeatherForecast: WeatherForecast | null
}

export type TravelAdvisorApiState = {
	rating: string
	places: Place[]
	filteredPlaces: Place[]
	typeOfPlace: string
	placeClicked: number | null
}

export type GoogleMapsApiState = {
	isLoaded: boolean
	loadError: string | null
	coords: google.maps.LatLngLiteral
	bounds: Bounds
	placeClicked: Place | null
	mapRef: google.maps.Map | null
}

export type User = {
	token: string
}
