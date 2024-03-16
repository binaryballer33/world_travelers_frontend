import { Bounds } from './LatLng'
import { Place } from './Place'

export type RootState = {
	maps: GoogleMapsApiState
	user: User
	travelAdvisor: TravelAdvisorApiState
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
}

export type User = {
	token: string
}
