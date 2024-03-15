import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { Place } from '../../types/Place';
import { Box, CircularProgress } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import styles from './styles'
import { useSelector } from 'react-redux';
import { RootState } from '../../types/State';

type ReactGoogleMapProps = {
    coords: google.maps.LatLng
    places: any;
    setCoords: any;
    setBounds: any;
    setChildClicked: any;
    weatherData: any;
};

const ReactGoogleMap = ({
    coords,
    places,
    setCoords,
    setBounds,
    setChildClicked,
    weatherData
}) => {
    // get the isLoaded and loadError state from the redux store for the google maps api
    const { isLoaded, loadError } = useSelector((state: RootState) => state.maps)
    const [center, setCenter] = useState<google.maps.LatLngLiteral>(); // Set your default coordinates here
    const mapRef = useRef<google.maps.Map | null>(null); // A reference to the map

    // When the map is loaded, set the mapRef to the map
    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;
    }, [])

    // remove the mapRef when the component is unmounted
    const onUnmount = React.useCallback(function callback() {
        mapRef.current = null;
    }, [])

    // change the coords and map center state when the user finishes dragging the map
    const onDragEnd = () => {
        if (mapRef?.current) {
            const center = mapRef?.current.getCenter();
            setCoords({ lat: center?.lat(), lng: center?.lng() });
            setCenter({ lat: center?.lat()!, lng: center?.lng()! });

            const bounds = mapRef?.current.getBounds();
            if (bounds) {
                setBounds({
                    ne: { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
                    sw: { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
                });
            }
        }
    }

    // get user's location and set the coords state equal to the user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            // destructure latitude and longitude from the position.coords
            ({ coords: { latitude, longitude } }) => {
                setCoords({ lat: latitude, lng: longitude })
                setCenter({ lat: latitude, lng: longitude })
            }
        )
    }, [setCoords])

    // show error message if the map cannot be loaded
    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '1000px'
            }}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onDragEnd={onDragEnd}
        >
            {/* Put Places On The Map */}
            {places.length &&
                places.map((place: Place, index: number) => (
                    // put a marker on the map for each place
                    <Box
                        sx={styles.markerContainer}
                        key={index}
                    >
                        <OverlayView
                            position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                            mapPaneName={OverlayView.MAP_PANE}
                        >
                            <LocationOnOutlinedIcon
                                color="primary"
                                fontSize="large"
                            />
                        </OverlayView>
                    </Box>
                ))}
        </GoogleMap>
    ) : <CircularProgress />
};

export default React.memo(ReactGoogleMap);
