import React, { useEffect } from 'react'
import {
	Grid,
	Stack,
} from '@mui/material'
import TravelAdvisorCard from './TravelAdvisorCard/TravelAdvisorCard'
import { Place } from '../../types/Place'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import { setFilteredPlaces } from '../../redux/travelAdvisorSlice'
import Loading from '../StateIndicators/Loading'

const TravelAdvisorPlaces = () => {
	const dispatch = useDispatch()
	const { rating, places, filteredPlaces, isFetchingPlaces } = useSelector((state: RootState) => state.travelAdvisor)
	const placesToRender = filteredPlaces.length ? filteredPlaces : places

	// filter places by rating
	useEffect(() => {
		const filteredPlaces = places!.filter((place: Place) => Number(place.rating) >= Number(rating))
		dispatch(setFilteredPlaces(filteredPlaces))
	}, [rating])

	return (
		<Stack sx={styles.container}>
			{/* If component is loading, display loading indicator */}
			{isFetchingPlaces ? (
				<Loading />
			) : (
				// If component is not loading, display the form and the list of places
				<Grid container spacing={3} sx={styles.list}>
					{placesToRender?.map((place: Place, index: number) => (
						<Grid item key={index}>
							<TravelAdvisorCard place={place} />
						</Grid>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export default TravelAdvisorPlaces
