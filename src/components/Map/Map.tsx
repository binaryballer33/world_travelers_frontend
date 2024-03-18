import React, { memo, useCallback, useEffect, useRef } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { Place } from '../../types/Place';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import styles from './styles'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { setBounds, setCoords, setPlaceClicked } from "../../redux/googleMapsSlice"
import { RootState } from '../../types/State';
import Loading from '../StateIndicators/Loading';
import TravelAdvisorCard from '../Places/TravelAdvisorCard/TravelAdvisorCard';

type MapProps = {};

const Map = ({ }: MapProps) => {
    const dispatch = useDispatch(); // update the redux store for the map bounds
    // isLoaded and loadError from redux store for google maps api, maps needs to load before we can use it
    const { isLoaded, loadError, coords, placeClicked } = useSelector((state: RootState) => state.maps)
    // get the places from the redux store, put them on the map
    const { places } = useSelector((state: RootState) => state.travelAdvisor)
    const mapRef = useRef<google.maps.Map | null>(null); // A reference to the map

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.down('md'))
    const isDesktop = useMediaQuery(theme.breakpoints.down('lg'))
    const mapHeight = isMobile ? '400px' : isTablet ? '450px' : isDesktop ? '500px' : '550px'

    /* When the map is loaded, set the mapRef to the map, it gets the map object <GoogleMap onLoad={onLoad}/> component
     * create event listener when someone changes the maps center either by dragging
     * or with the autocomplete search box, fetch new places from the api
    */
    const onLoad = useCallback(function callback(map: google.maps.Map) {
        mapRef.current = map;

        // /* Use debounce to make sure that the api is not called a million times when trying to drag the map */
        const handleIdle = debounce(() => {
            if (mapRef?.current) {
                const bounds = mapRef?.current.getBounds();
                if (bounds) {
                    const boundsFormat = {
                        ne: { lat: bounds.getNorthEast().lat(), lng: bounds.getNorthEast().lng() },
                        sw: { lat: bounds.getSouthWest().lat(), lng: bounds.getSouthWest().lng() },
                    }
                    dispatch(setBounds(boundsFormat))
                }
            }
        }, 1000);

        /*
        * when the map instance is created, add a event listener to the map
        * to get the bounds of the map when the user finishes dragging/changing the center of the map
        */
        const handleCenterChanged = () => {
            google.maps.event.addListener(map, "idle", handleIdle);
        };

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

    // get user's location and set the coords state equal to the user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            // destructure latitude and longitude from the position.coords
            ({ coords: { latitude, longitude } }) => {
                dispatch(setCoords({ lat: latitude, lng: longitude }))
            }
        )
    }, [setCoords])

    // show error message if the map cannot be loaded
    if (loadError) {
        return <div>Map cannot be loaded right now.</div>
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: mapHeight }}
            center={coords}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Put Places On The Map */}
            {places.length &&
                places.map((place, index: number) => (
                    // put a marker on the map for each place
                    <Box key={index} >
                        <Marker
                            position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                            onClick={() => dispatch(setPlaceClicked(place))}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png",
                                scaledSize: new google.maps.Size(24, 24),
                            }}
                        />
                        {placeClicked === place && (
                            <InfoWindow position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}>
                                <TravelAdvisorCard place={place} />
                            </InfoWindow>
                        )}
                    </Box>
                ))
            }
        </GoogleMap >
    ) : <Loading />
};

export default memo(Map);
