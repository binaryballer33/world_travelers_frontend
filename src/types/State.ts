export type RootState = {
	maps: GoogleMapsAPIState
}

export type GoogleMapsAPIState = {
	isLoaded: boolean
	loadError: string | null
}
