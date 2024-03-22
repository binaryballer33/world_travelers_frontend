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
import { useLazyGetAirbnbsQuery } from '../../../api/thirdPartyApis/airbnbApi';
import { setAdults, setCheckin, setCheckout, setChildren, setCurrency, setFilteredAirbnbs, setInfants, setIsFetchingAirbnbs, setPets, setReviewCount } from '../../../redux/airbnbSlice';
import GuestDropDownMenu from '../../UI/Input/GuestDropDownMenu';
import CurrencyDropdownMenu from '../../UI/Input/CurrencyDropdownMenu';
import DateInputField from '../../UI/Input/DateInputField';
import QueryButton from '../../UI/Buttons/QueryButton';

const AirbnbSearchOptions = () => {
    const dispatch = useDispatch()
    const { bounds } = useSelector((state: RootState) => state.maps)
    const { checkin, checkout, adults, children, infants, pets, currency, isFetchingAirbnbs } = useSelector((state: RootState) => state.airbnb)
    const airbnbConfig = { bounds, checkin, checkout, adults, children, infants, pets, currency }
    const [getAirbnbs] = useLazyGetAirbnbsQuery() // query used to get places by map bounds

    const handleSearchForAirbnbs = async () => {
        if (!_.isEqual(bounds, defaultBounds)) {
            dispatch(setIsFetchingAirbnbs(true))
            await getAirbnbs(airbnbConfig) // extra reducer in travelAdvisorSlice will update the places state
            dispatch(setIsFetchingAirbnbs(false))
            dispatch(setFilteredAirbnbs([])) // reset the filtered airbnbs
            dispatch(setReviewCount(0)) // get all the new airbnbs, so reset the rating
        }
    }

    return (
        <Box>
            {/* Search Configuration Header */}
            <Typography variant="h4" sx={styles.searchOptionHeader}>What Kind Of Airbnb Do You Want</Typography>

            {/* Buttons Used To Configure A Search */}
            <Grid container sx={styles.gridContainer}>
                {/* ADD CALENDAR FOR CHECKIN CHECKOUT DATES */}
                <DateInputField date={checkin} setDate={setCheckin} inputName='Check In' />
                <DateInputField date={checkout} setDate={setCheckout} inputName='Check Out' />

                {/* Amount Of Adults, Children, Infants and Pets You Are Bringing  */}
                <GuestDropDownMenu inputName="Adults" value={adults} setValue={setAdults} />
                <GuestDropDownMenu inputName="Children" value={children} setValue={setChildren} />
                <GuestDropDownMenu inputName="Infants" value={infants} setValue={setInfants} />
                <GuestDropDownMenu inputName="Pets" value={pets} setValue={setPets} />

                {/* Currency You Want Your Results In */}
                <CurrencyDropdownMenu inputName="Currency" value={currency} setCurrency={setCurrency} />

                {/* Execute The Search Query Button */}
                <QueryButton text="Search For Airbnbs" isFetching={isFetchingAirbnbs} executeQueryHandler={handleSearchForAirbnbs} />
            </Grid>
        </Box>
    )
};

export default AirbnbSearchOptions;
