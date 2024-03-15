const getCityCoordinates = async (cityName: string) => {
	const geocoder = new google.maps.Geocoder()

	return new Promise((resolve, reject) => {
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
