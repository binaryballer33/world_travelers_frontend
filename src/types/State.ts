import { Bounds } from './LatLng'
import { Place } from './Place'

export type RootState = {
	maps: GoogleMapsApiState
	user: User
	travelAdvisor: TravelAdvisorApiState
}

export type TravelAdvisorApiState = {
	rating: number
	places: Place[]
}

export type GoogleMapsApiState = {
	isLoaded: boolean
	loadError: string | null
	mapBounds: Bounds | undefined
}

export type User = {
	token: string
}
