import { useState, useEffect, createRef } from 'react'
import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Box,
} from '@mui/material'

import PlaceDetails from '../PlaceDetails/PlaceDetails'
import styles from './styles'

const List = ({
	places,
	type,
	setType,
	rating,
	setRating,
	childClicked,
	isLoading,
}) => {
	const [elRefs, setElRefs] = useState([])

	useEffect(() => {
		setElRefs((refs) =>
			Array(places.length)
				.fill()
				.map((_, i) => refs[i] || createRef())
		)
	}, [places])

	return (
		<Box sx={styles.container}>
			<Typography variant="h4">Food & Dining around you</Typography>
			{isLoading ? (
				<Box sx={styles.loading}>
					<CircularProgress size="5rem" />
				</Box>
			) : (
				<>
					<FormControl sx={styles.formControl}>
						<InputLabel id="type">Type</InputLabel>
						<Select
							id="type"
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<MenuItem value="restaurants">Restaurants</MenuItem>
							<MenuItem value="hotels">Hotels</MenuItem>
							<MenuItem value="attractions">Attractions</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={styles.formControl}>
						<InputLabel id="rating">Rating</InputLabel>
						<Select
							id="rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="3">Above 3.0</MenuItem>
							<MenuItem value="4">Above 4.0</MenuItem>
							<MenuItem value="4.5">Above 4.5</MenuItem>
						</Select>
					</FormControl>
					<Grid container spacing={3} sx={styles.list}>
						{places?.map((place, i) => (
							<Grid ref={elRefs[i]} key={i} item xs={12}>
								<PlaceDetails
									selected={Number(childClicked) === i}
									refProp={elRefs[i]}
									place={place}
								/>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</Box>
	)
}

export default List
