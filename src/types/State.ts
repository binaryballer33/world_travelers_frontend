import { Bounds } from './LatLng'

export type RootState = {
	maps: GoogleMapsAPIState
	user: User
}

export type GoogleMapsAPIState = {
	isLoaded: boolean
	loadError: string | null
	mapBounds: Bounds | undefined
}

export type User = {
	token: string
}
