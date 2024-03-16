import React from 'react'
import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Chip,
	Rating,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import styles from './styles'
import { Place } from '../../../types/Place'

type PlaceCardProps = {
	place: Place
	selected: boolean;
	refProp: React.RefObject<HTMLDivElement>;
}

const PlaceCard = ({ place, selected, refProp }: PlaceCardProps) => {
	// TODO: implement later: when user clicks on location, map will have a InfoWindow with the place details

	// TODO: stop this for now to avoid scrolling and later make the scrolling work when you click on the icon on the map
	// if (selected)
	// 	refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

	const imageUrl = place.photo?.images?.large?.url ? place.photo.images.large.url
		: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'

	return (
		<Card elevation={6} sx={styles.cardContainer}>
			<CardMedia
				sx={styles.cardMedia}
				image={imageUrl}
				title={place.name}
			/>
			<CardContent>
				{/* place name */}
				<Typography gutterBottom variant="h5">
					{place.name}
				</Typography>

				{/* place rating */}
				<Box sx={styles.cardContent} my={2}>
					<Rating
						name="read-only"
						value={Number(place.rating)}
						readOnly
					/>
					<Typography component="legend">
						{place.num_reviews} review{place.num_reviews > 1 && 's'}
					</Typography>
				</Box>

				{/* place price */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Price</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.price_level}
					</Typography>
				</Box>

				{/* place ranking */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Ranking</Typography>
					<Typography gutterBottom variant="subtitle1">
						{place.ranking}
					</Typography>
				</Box>

				{/* place awards */}
				{place?.awards?.map((award, index) => (
					<Box
						display="flex"
						justifyContent="space-between"
						my={1}
						alignItems="center"
						key={index}
					>
						<img src={award.images.small} />
						<Typography variant="subtitle2" color="textSecondary">
							{award.display_name}
						</Typography>
					</Box>
				))}

				{/* place cuisine */}
				{place?.cuisine?.map(({ name }) => (
					<Chip
						key={name}
						size="small"
						label={name}
						sx={styles.chip}
					/>
				))}

				{/* place address */}
				{place.address && (
					<Typography
						gutterBottom
						variant="body2"
						color="textSecondary"
						sx={styles.subtitle}
					>
						<LocationOnIcon />
						{place.address}
					</Typography>
				)}

				{/* place phone */}
				{place.phone && (
					<Typography
						variant="body2"
						color="textSecondary"
						sx={styles.spacing}
					>
						<PhoneIcon /> {place.phone}
					</Typography>
				)}
			</CardContent>

			{/* Links To Trip Advisor And Place Website */}
			<CardActions>
				<Button
					size="small"
					color="primary"
					onClick={() => window.open(place.web_url, '_blank')}
				>
					Trip Advisor
				</Button>
				<Button
					size="small"
					color="primary"
					onClick={() => window.open(place.website, '_blank')}
				>
					Website
				</Button>
			</CardActions>
		</Card>
	)
}

export default PlaceCard
