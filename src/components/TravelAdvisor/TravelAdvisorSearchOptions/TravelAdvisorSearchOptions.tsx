import React from 'react'
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography,
    Box,
    Grid
} from '@mui/material'
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types/State';
import { setFilteredPlaces, setIsFetchingPlaces, setRating, setTypeOfPlace } from '../../../redux/travelAdvisorSlice';
import { defaultBounds } from '../../../utils/constants';
import { useLazyGetPlacesByMapBoundsQuery } from '../../../api/thirdPartyApis/travelAdvisorApi';
import _ from 'lodash';
import QueryButton from '../../UI/Buttons/QueryButton';

const TravelAdvisorSearchOptions = () => {
    const dispatch = useDispatch()
    const { typeOfPlace, rating, isFetchingPlaces } = useSelector((state: RootState) => state.travelAdvisor)
    const { bounds } = useSelector((state: RootState) => state.maps)
    const [getPlacesByMapBounds] = useLazyGetPlacesByMapBoundsQuery() // query used to get places by map bounds

    const handleSearchForPlaces = async () => {
        if (!_.isEqual(bounds, defaultBounds)) {
            await getPlacesByMapBounds({ typeOfPlace, bounds }) // extra reducer in travelAdvisorSlice will update the places state
            dispatch(setFilteredPlaces([])) // reset the filtered places
            dispatch(setRating('')) // get all the new places, so reset the rating
        }
    }

    return (
        <Box>
            {/* Search Configuration Header */}
            <Typography variant="h4" sx={styles.searchOptionHeader}>What Are You Looking For</Typography>

            {/* Buttons Used To Configure A Search */}
            <Grid container sx={styles.gridContainer}>
                {/* Type Of Places To Return  */}
                <Grid item>
                    <FormControl sx={styles.input}>
                        <Select
                            id="type"
                            value={typeOfPlace}
                            onChange={(e) => dispatch(setTypeOfPlace(e.target.value))}
                        >
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Rating Of The Places */}
                <Grid item>
                    <FormControl sx={styles.input}>
                        <InputLabel id="rating">Rating</InputLabel>
                        <Select
                            id="rating"
                            value={rating}
                            onChange={(e) => dispatch(setRating(e.target.value))}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="2">2.0 Or Higher</MenuItem>
                            <MenuItem value="3">3.0 Or Higher</MenuItem>
                            <MenuItem value="4">4.0 Or Higher</MenuItem>
                            <MenuItem value="4.5">4.5 Or Higher</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <QueryButton text="Search For Places" isFetching={isFetchingPlaces} executeQueryHandler={handleSearchForPlaces} />
            </Grid>
        </Box>
    )
};

export default TravelAdvisorSearchOptions;
