import React, { useState, useEffect, createRef } from 'react'
import {
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Box,
	Stack,
} from '@mui/material'
import PlaceCard from './PlaceCard/PlaceCard'
import { Place } from '../../types/Place'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../types/State'
import { setTypeOfPlace, setRating } from '../../redux/travelAdvisorSlice'
import Loading from '../../state_indicators/Loading'

type PlacesProps = {
	childClicked: string | null
	isFetching: boolean
}

const Places = ({
	childClicked,
	isFetching,
}: PlacesProps) => {
	const { typeOfPlace, rating, places, filteredPlaces } = useSelector((state: RootState) => state.travelAdvisor)
	const dispatch = useDispatch()
	const [elRefs, setElRefs] = useState([]) // used to create a ref for each place
	const placesToRender = filteredPlaces.length ? filteredPlaces : places

	// When the places change, create a ref for each place
	useEffect(() => {
		setElRefs((refs) =>
			Array(placesToRender.length)
				.fill(0)
				.map((_, index: number) => refs[index] || createRef())
		)
	}, [placesToRender])

	return (
		<Stack sx={styles.container}>
			{/* Section Header */}
			<Typography variant="h4" sx={styles.textCenter}>What Are You Looking For</Typography>

			{/* If component is loading, display loading indicator */}
			{isFetching ? (
				<Box sx={styles.loading}>
					<Loading />
				</Box>
			) : (
				// If component is not loading, display the form and the list of places
				<Box>
					<Stack sx={styles.formControlContainer}>
						{/* Type Of Places To Return  */}
						<FormControl sx={styles.formControl}>
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

						{/* Rating Of The Places */}
						<FormControl sx={styles.formControl}>
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
					</Stack>

					{/* List Of Places */}
					<Grid container spacing={3} sx={styles.list}>
						{placesToRender?.map((place: Place, index: number) => (
							<Grid item ref={elRefs[index]} key={index}>
								<PlaceCard
									selected={Number(childClicked) === index}
									refProp={elRefs[index]}
									place={place}
								/>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Stack>
	)
}

export default Places
