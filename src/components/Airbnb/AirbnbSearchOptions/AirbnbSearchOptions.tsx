import React from 'react'
import {
    Stack,
    Button,
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
import { setAdults, setChildren, setCurrency, setFilteredAirbnbs, setInfants, setIsFetchingAirbnbs, setPets, setReviewCount } from '../../../redux/airbnbSlice';
import AirbnbGuestDropDownMenu from '../../UI/Input/AirbnbGuestDropDownMenu';
import CurrencyDropdownMenu from '../../UI/Input/CurrencyDropdownMenu';
import PriceRange from '../../UI/Input/PriceRange';
import StayDurationDate from '../../UI/Input/StayDurationDate';

const AirbnbSearchOptions = () => {
    const airbnbState = useSelector((state: RootState) => state.airbnb)
    console.log({ airbnbState });

    const dispatch = useDispatch()
    const { checkin, checkout, adults, children, infants, pets, minPrice, maxPrice, currency } = useSelector((state: RootState) => state.airbnb)
    const { bounds } = useSelector((state: RootState) => state.maps)
    const airbnbConfig = { bounds, checkin, checkout, adults, children, infants, pets, currency }
    const [getAirbnbs] = useLazyGetAirbnbsQuery() // query used to get places by map bounds

    const handleSearchForPlaces = async () => {
        if (!_.isEqual(bounds, defaultBounds)) {
            dispatch(setIsFetchingAirbnbs(true))
            const response = await getAirbnbs(airbnbConfig) // extra reducer in travelAdvisorSlice will update the places state
            console.log({ response });

            dispatch(setIsFetchingAirbnbs(false))
            dispatch(setFilteredAirbnbs([])) // reset the filtered airbnbs
            dispatch(setReviewCount(0)) // get all the new airbnbs, so reset the rating
        }
    }

    return (
        <Box>
            {/* Buttons Used To Configure A Search */}
            <Grid container sx={styles.gridContainer}>
                {/* ADD CALENDAR FOR CHECKIN CHECKOUT DATES */}
                <StayDurationDate checkin date={checkin} />
                <StayDurationDate checkout date={checkout} />

                {/* Amount Of Adults, Children, Infants and Pets You Are Bringing  */}
                <AirbnbGuestDropDownMenu inputName="Adults" value={adults} setValue={setAdults} />
                <AirbnbGuestDropDownMenu inputName="Children" value={children} setValue={setChildren} />
                <AirbnbGuestDropDownMenu inputName="Infants" value={infants} setValue={setInfants} />
                <AirbnbGuestDropDownMenu inputName="Pets" value={pets} setValue={setPets} />

                {/* Currency You Want Your Results In */}
                <CurrencyDropdownMenu inputName="Currency" value={currency} setCurrency={setCurrency} />

                {/* Execute The Search Query Button */}
                <Button variant="contained" onClick={handleSearchForPlaces} sx={styles.searchButton}>
                    Search For Airbnbs
                </Button>
            </Grid>

            <Stack>
                <Typography variant="h4" sx={styles.textCenter}>What Kind Of Airbnb Do You Want</Typography>
            </Stack>
        </Box>
    )
};

export default AirbnbSearchOptions;
