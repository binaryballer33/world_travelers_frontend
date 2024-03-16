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
	places: Place[]
	childClicked: string | null
	isLoading: boolean
}

const Places = ({
	places,
	childClicked,
	isLoading,
}: PlacesProps) => {
	const { typeOfPlace, rating } = useSelector((state: RootState) => state.travelAdvisor)
	const dispatch = useDispatch()
	const [elRefs, setElRefs] = useState([]) // used to create a ref for each place

	// When the places change, create a ref for each place
	useEffect(() => {
		setElRefs((refs) =>
			Array(places.length)
				.fill(0)
				.map((_, index: number) => refs[index] || createRef())
		)
	}, [places])

	return (
		<Stack sx={styles.container}>
			<Typography variant="h4" sx={styles.textCenter}>What Are You Looking For</Typography>

			{/* If component is loading, display loading indicator */}
			{isLoading ? (
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
								<MenuItem value="2">Above 2.0</MenuItem>
								<MenuItem value="3">Above 3.0</MenuItem>
								<MenuItem value="4">Above 4.0</MenuItem>
								<MenuItem value="4.5">Above 4.5</MenuItem>
							</Select>
						</FormControl>
					</Stack>

					{/* List Of Places */}
					<Grid container spacing={3} sx={styles.list}>
						{places?.map((place: Place, index: number) => (
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
