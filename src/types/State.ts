import { Bounds } from './LatLng'

export type RootState = {
	maps: GoogleMapsAPIState
}

export type GoogleMapsAPIState = {
	isLoaded: boolean
	loadError: string | null
	mapBounds: Bounds | undefined
}
