export type AirbnbResults = {
	results: Airbnb[]
}

export type Airbnb = {
	url: string
	deeplink: string
	name: string
	bathrooms: number
	bedrooms: number
	beds: number
	city: string
	images: string[]
	hostThumbnail: string
	isSuperhost: boolean
	rareFind: boolean
	lat: number
	lng: number
	persons: number
	reviewsCount: number
	type: string
	userId: number
	address: string
	previewAmenities: string[]
	cancelPolicy: string
	price: {
		rate: number
		currency: string
		total: number
		priceItems: {
			title: string
			amount: number
		}[]
	}
}
