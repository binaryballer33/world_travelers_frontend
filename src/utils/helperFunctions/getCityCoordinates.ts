import { LatLng } from '../../types/LatLng'

const getCityCoordinates = async (
	cityName: string
): Promise<LatLng | undefined> => {
	const geocoder = new google.maps.Geocoder()

	// don't make the request if the cityName is empty
	if (!cityName) return

	// return a promise that resolves to the lat and lng of the city
	return await new Promise((resolve, reject) => {
		geocoder.geocode({ address: cityName }, (results, status) => {
			if (status === 'OK') {
				const location = results![0].geometry.location
				resolve({
					lat: location.lat(),
					lng: location.lng(),
				})
			} else {
				reject(
					new Error(
						'Geocode was not successful for the following reason: ' +
							status
					)
				)
			}
		})
	})
}

export default getCityCoordinates
