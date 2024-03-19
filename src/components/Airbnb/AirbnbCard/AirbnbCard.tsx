import React from 'react'
import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Tooltip,
	Stack,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import styles from './styles'
import { Airbnb } from '../../../types/Airbnb'
import { useSelector } from 'react-redux'
import { RootState } from '../../../types/State'

type AirbnbCardProps = { airbnb: Airbnb }

const AirbnbCard = ({ airbnb }: AirbnbCardProps) => {
	const { currency, checkin, checkout } = useSelector((state: RootState) => state.airbnb)

	// used for the tooltip price breakdown when hovering over the price
	const lodgingPrice = airbnb.price?.priceItems[0]?.amount | 0
	const cleaningFee = airbnb.price?.priceItems[1]?.amount | 0
	const airbnbServiceFee = airbnb.price?.priceItems[2]?.amount | 0
	const priceBreakdown = `Lodging: ${lodgingPrice}, ${currency} Cleaning Fee: ${cleaningFee} ${currency}, Airbnb Service Fee ${airbnbServiceFee} ${currency}`

	return (
		<Card elevation={6} sx={styles.cardContainer}>
			<CardMedia
				sx={styles.cardMedia}
				image={airbnb.images[0]}
				title={airbnb.name}
			/>
			<CardContent>
				{/* airbnb name */}
				<Typography gutterBottom variant="h5" textAlign="center">
					{airbnb.name}
				</Typography>

				<Stack flexDirection="row" justifyContent="space-between">
					{/* checkin */}
					<Typography gutterBottom variant="body1">
						Check In: {checkin}
					</Typography>

					{/* checkout */}
					<Typography gutterBottom variant="body1">
						Check Out: {checkout}
					</Typography>
				</Stack>
				{/* airbnb price */}
				<Tooltip title={priceBreakdown} >
					<Box sx={styles.cardContent}>
						<Typography component="legend">Price</Typography>
						<Typography gutterBottom variant="subtitle1">
							{airbnb.price.total ? airbnb.price.total : airbnb.price.rate} {airbnb.price.currency}
						</Typography>
					</Box>
				</Tooltip>

				{/* airbnb reviews */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Reviews</Typography>
					<Typography gutterBottom variant="subtitle1">
						{airbnb.reviewsCount}
					</Typography>
				</Box>

				{/* airbnb type */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Type</Typography>
					<Typography gutterBottom variant="subtitle1">
						{airbnb.type}
					</Typography>
				</Box>

				{/* airbnb bedrooms */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Bedrooms</Typography>
					<Typography gutterBottom variant="subtitle1">
						{airbnb.bedrooms} Bedroom{airbnb.bedrooms > 1 && "s"} {airbnb.beds} Beds
					</Typography>
				</Box>

				{/* airbnb bathrooms */}
				<Box sx={styles.cardContent}>
					<Typography component="legend">Bathrooms</Typography>
					<Typography gutterBottom variant="subtitle1">
						{airbnb.bathrooms}
					</Typography>
				</Box>

				{/* airbnb address */}
				{airbnb.address && (
					<Typography
						gutterBottom
						variant="body2"
						color="textSecondary"
						sx={styles.subtitle}
					>
						<LocationOnIcon color='primary' />
						{airbnb.address}
					</Typography>
				)}
			</CardContent>

			{/* Links To Trip Advisor And airbnb Website */}
			<CardActions sx={styles.cardActions}>
				<Button
					size="small"
					color="primary"
					onClick={() => window.open(airbnb.deeplink, '_blank')}
				>
					Website
				</Button>
			</CardActions>
		</Card>
	)
}

export default AirbnbCard
