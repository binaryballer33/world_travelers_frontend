const getCityBounds = async (cityName) => {
    const geocoder = new google.maps.Geocoder()

    return new Promise((resolve, reject) => {
        try {
            geocoder.geocode({ address: cityName }, (results, status) => {
                if (status === 'OK') {
                    const bounds = results[0].geometry.bounds
                    resolve({
                        ne: {
                            lat: bounds.getNorthEast().lat(),
                            lng: bounds.getNorthEast().lng(),
                        },
                        sw: {
                            lat: bounds.getSouthWest().lat(),
                            lng: bounds.getSouthWest().lng(),
                        },
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
        } catch (error) {
            console.log('error', error);
        }
    })
}

export default getCityBounds
