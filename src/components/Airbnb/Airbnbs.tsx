import React, { useEffect } from 'react'
import {
	Grid,
	Stack,
} from '@mui/material'
import AirbnbCard from './AirbnbCard/AirbnbCard'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import Loading from '../StateIndicators/Loading'
import { Airbnb } from '../../types/Airbnb'
import { setFilteredAirbnbs } from '../../redux/airbnbSlice'
import PriceRange from '../UI/Input/PriceRange'

const Airbnbs = () => {
	const dispatch = useDispatch()
	const { airbnbs, filteredAirbnbs, isFetchingAirbnbs, minPrice, maxPrice } = useSelector((state: RootState) => state.airbnb)
	const airbnbsToRender = filteredAirbnbs?.length ? filteredAirbnbs : airbnbs

	// filter airbnbs by price
	useEffect(() => {
		const filter = airbnbs!.filter((airbnb: Airbnb) => airbnb.price.rate >= minPrice && airbnb.price.rate <= maxPrice)
		dispatch(setFilteredAirbnbs(filter))
	}, [minPrice, maxPrice])

	return (
		<Stack sx={styles.container}>
			{/* Min and Max Price Range For Airbnb */}
			{airbnbs.length > 0 && (
				<Stack flexDirection="row">
					<PriceRange minPrice priceRange={minPrice} />
					<PriceRange maxPrice priceRange={maxPrice} />
				</Stack>
			)}

			{/* If component is loading, display loading indicator */}
			{isFetchingAirbnbs ? (
				<Loading />
			) : (
				// If component is not loading, display the form and the list of airbnbs
				<Grid container spacing={3} sx={styles.airbnbListings}>
					{airbnbsToRender?.map((airbnb: Airbnb, index: number) => (
						<Grid item key={index}>
							<AirbnbCard airbnb={airbnb} />
						</Grid>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export default Airbnbs
