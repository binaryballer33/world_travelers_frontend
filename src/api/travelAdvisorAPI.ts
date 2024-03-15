import axios from 'axios'
import { RAPID_API_KEY } from '../utils/secrets'

interface LatLng {
	lat: number
	lng: number
}

export const getPlacesData = async (type: string, sw: LatLng, ne: LatLng) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
					tr_latitude: ne.lat,
				},
				headers: {
					'x-rapidapi-key': RAPID_API_KEY,
					'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
				},
			}
		)
		return data
	} catch (error) {
		console.log(error)
	}
}

export const getWeatherData = async (lat: LatLng, lng: LatLng) => {
	try {
		if (lat && lng) {
			const { data } = await axios.get(
				'https://community-open-weather-map.p.rapidapi.com/find',
				{
					params: { lat, lon: lng },
					headers: {
						'x-rapidapi-key': RAPID_API_KEY,
						'x-rapidapi-host':
							'community-open-weather-map.p.rapidapi.com',
					},
				}
			)
			return data
		}
	} catch (error) {
		console.log(error)
	}
}
