import axios from 'axios'
import { RAPID_API_KEY } from '../../utils/secrets'
import { LatLng } from '../../types/LatLng'

const getWeatherData = async (lat: LatLng, lng: LatLng) => {
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

export default getWeatherData
