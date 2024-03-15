export type Place = {
	name: string
	photo: { images: { large: { url: string } } }
	address: string
	rating: number
	ranking: number
	num_reviews: number
	price_level: string
	website: string
	phone: string
	web_url: string
	awards: { images: { small: string }; display_name: string }[]
	longitude: string
	latitude: string
	cuisine?: { name: string }[]
	isClosed?: boolean
	hours?: string
	distance_string?: string
	open_now_text?: string
}
