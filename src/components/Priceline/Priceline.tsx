import React from 'react'
import {
    Grid,
    Stack,
} from '@mui/material'
import styles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import Loading from '../StateIndicators/Loading'
import PricelineCard from './PricelineCard/PricelineCard'
import { ItineraryData } from '../../types/Flights'

const Priceline = () => {
    const { data, isFetching } = useSelector((state: RootState) => state.priceline)

    return (
        <Stack sx={styles.container}>
            {/* If component is loading, display loading indicator */}
            {isFetching ? (
                <Loading />
            ) : (
                // If component is not loading, display the form and the list of places
                <Grid container spacing={3} sx={styles.list}>
                    {data?.map((itinerary: ItineraryData, index: number) => (
                        <Grid item key={index}>
                            <PricelineCard data={itinerary} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    )
}

export default Priceline
