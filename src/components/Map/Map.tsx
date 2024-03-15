import React, { memo, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, OverlayView, InfoWindow } from '@react-google-maps/api';
import { Place } from '../../types/Place';
import { Box, CircularProgress } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import styles from './styles'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { setMapBounds } from "../../redux/googleMapsSlice"
import { RootState } from '../../types/State';
import { Bounds } from '../../types/LatLng';

type MapProps = {
    places: Place[];
    weatherData: any;
    coords: google.maps.LatLngLiteral
    setCoords: (coords: google.maps.LatLngLiteral) => void;
    setBounds: (bounds: Bounds) => void;
    setChildClicked: any;
};

const Map = ({
    places,
    weatherData,
    coords,
    setCoords,
    setBounds,
    setChildClicked
}: MapProps) => {
    // get the isLoaded and loadError state from the redux store for the google maps api
    const { isLoaded, loadError } = useSelector((state: RootState) => state.maps)
    const mapRef = useRef<google.maps.Map | null>(null); // A reference to the map
    const dispatch = useDispatch(); // update the redux store for the map bounds

    // When the map is loaded, set the mapRef to the map, it gets the map object <GoogleMap onLoad={onLoad}/> component
    const onLoad = useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;


        /* Use debounce to make sure that the api is not called a million times when trying to drag the map */
        const handleCenterChanged = debounce(() => {
            console.log("Center Change With Debounce");
            if (mapRef?.current) {
                const bounds = mapRef?.current.getBounds();
                if (bounds) {
                    const boundsFormat = {
                        ne: { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
                        sw: { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
                    }
                    dispatch(setMapBounds(boundsFormat))
                    setBounds(boundsFormat)
                }
            }
        }, 2000);

        /*
        * when the map instance is created, add a event listener to the map
        * to get the bounds of the map when the user changes the center of the map
        */
        google.maps.event.addListener(map, "center_changed", handleCenterChanged);
    }, [])


    // remove the mapRef when the component is unmounted
    const onUnmount = useCallback(function callback() {
        mapRef.current = null;
    }, [])

    // change the coords of the map center when the user finishes dragging the map
    const onDragEnd = () => {
        if (mapRef?.current) {
            const lat = mapRef?.current?.getCenter()?.lat();
            const lng = mapRef?.current?.getCenter()?.lng();

            if (typeof lat === 'number' && typeof lng === 'number') {
                setCoords({ lat, lng });
            }

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
            }
        )
    }, [setCoords])

    // show error message if the map cannot be loaded
    if (loadError) {
        return <div>Map cannot be loaded right now.</div>
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '1000px'
            }}
            center={coords}
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

export default memo(Map);
