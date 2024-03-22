import React from 'react'
import {
    Typography,
    Box,
    Grid
} from '@mui/material'
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types/State';
import { defaultBounds } from '../../../utils/constants';
import _ from 'lodash';
import { useLazyGetRoundTripFlightsPricelineQuery } from '../../../api/thirdPartyApis/priceLineApi';
import { setAdults, setDepartureDate, setDestinationAirportCode, setFilteredData, setOriginAirportCode, setRating, setReturnDate, setTypeOfData } from '../../../redux/pricelineSlice';
import GuestDropDownMenu from '../../UI/Input/GuestDropDownMenu';
import DateInputField from '../../UI/Input/DateInputField';
import AirportCodeInputField from '../../UI/Input/AirportCodeInputField';
import QueryButton from '../../UI/Buttons/QueryButton';

const PricelineSearchOptions = () => {
    const dispatch = useDispatch()
    const { adults, departureDate, returnDate, originAirportCode, destinationAirportCode, currency, isFetching } = useSelector((state: RootState) => state.priceline)
    const bounds = useSelector((state: RootState) => state.maps)
    const [getRoundTripFlights] = useLazyGetRoundTripFlightsPricelineQuery() // query used to get round flight data from priceline
    const flightQueryConfig = { adults, departureDate, returnDate, originAirportCode, destinationAirportCode, currency }

    const handleSearchForData = async () => {
        if (!_.isEqual(bounds, defaultBounds)) {
            await getRoundTripFlights(flightQueryConfig) // extra reducer in travelAdvisorSlice will update the places state
            dispatch(setFilteredData([])) // reset the filtered places
        }
    }

    return (
        <Box>
            {/* Search Configuration Header */}
            <Typography variant="h4" sx={styles.searchOptionHeader}>What Do You Want To Search With Priceline</Typography>

            {/* Buttons Used To Configure A Search */}
            <Grid container sx={styles.gridContainer}>
                <GuestDropDownMenu inputName="Adults" value={adults} setValue={setAdults} />
                <DateInputField date={departureDate} setDate={setDepartureDate} inputName='Departure' />
                <DateInputField date={returnDate} setDate={setReturnDate} inputName='Return' />
                <AirportCodeInputField airportCode={originAirportCode} setAirportCode={setOriginAirportCode} inputName='Origin Airport' />
                <AirportCodeInputField airportCode={destinationAirportCode} setAirportCode={setDestinationAirportCode} inputName='Destination Airpot' />
                <QueryButton text="Search Priceline" isFetching={isFetching} executeQueryHandler={handleSearchForData} />
            </Grid>
        </Box >
    )
};

export default PricelineSearchOptions;
