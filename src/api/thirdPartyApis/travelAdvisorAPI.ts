import axios from 'axios'
import { RAPID_API_KEY } from '../../utils/secrets'
import { Bounds } from '../../types/LatLng'

const getPlacesByMapBounds = async (typeOfPlace: string, bounds: Bounds) => {
	try {
		// this api endpoint gets me more data than the lat lng endpoint
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${typeOfPlace}/list-in-boundary`,
			{
				params: {
					bl_latitude: bounds.sw.lat,
					bl_longitude: bounds.sw.lng,
					tr_longitude: bounds.ne.lng,
					tr_latitude: bounds.ne.lat,
					limit: '30', // max per the api docs
					currency: 'USD',
					lunit: 'mi',
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

export default getPlacesByMapBounds
