import React from "react";
import {
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    BoxProps,
    Stack,
    Tooltip,
    CardMedia,
    Divider,
    Box
} from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import styles from './styles'
import { ItineraryData } from "../../../types/Flights";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/State"
import { getTimeDetails } from "../../../utils/helperFunctions/getTimeDetails";

type PricelineCardProps = BoxProps & {
    data: ItineraryData
}

const PricelineCard = ({ data: { price_details, slice_data } }: PricelineCardProps) => {
    const { data } = useSelector((state: RootState) => state.priceline);
    const totalPrice = `Base Fare: PPN ${price_details.display_base_fare}${price_details.display_symbol}, Taxes: ${price_details.display_taxes}${price_details.display_symbol}, PPN: ${price_details.display_ppn_fees}${price_details.display_symbol}, PCLN: ${price_details.display_pcln_fees}${price_details.display_symbol}`

    return (
        <Card elevation={6} sx={styles.cardContainer}>
            {/* Flight Airline Logo And Name Header */}
            <Stack gap={2} sx={styles.airlineBanner}>
                <CardMedia image={slice_data.slice_0.airline.logo} sx={styles.cardMedia} />
                <Typography variant="h5" color="primary.main">
                    {slice_data.slice_0.flight_data.flight_0.info.operating_airline}
                </Typography>
            </Stack>

            <CardContent sx={styles.cardContent}>
                {/* Start Of Trip Information */}
                <Typography variant="h6" color="initial" mt={2}>
                    Start Trip: {slice_data.slice_0.flight_data.flight_0.arrival.datetime.date_display}
                </Typography>

                <Stack sx={styles.tripInformationContainer}>
                    {/* Origin Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Origin Airport  */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Origin
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip
                                label={slice_data.slice_0.departure.airport.name || slice_data.slice_0.departure.airport.code}
                                avatar={<FlightTakeoffIcon />}
                                sx={styles.chip}
                            />
                        </Typography>

                        {/* Origin Airport Takeoff Time */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Departure Time
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_0.departure.datetime.time_12h} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Destination Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Destination Airport */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Destination
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip
                                label={slice_data.slice_0.arrival.airport.name || slice_data.slice_0.arrival.airport.code}
                                sx={styles.chip}
                                avatar={<FlightLandIcon />}
                            />
                        </Typography>

                        {/* Destination Airport Arrival Time */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Arrival Time
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_0.arrival.datetime.time_12h} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Flight Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Flight Number */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Flight Number
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={`${slice_data.slice_0.airline.code} ${slice_data.slice_0.flight_data.flight_0.info.flight_number}`} sx={styles.chip} />
                        </Typography>

                        {/* Flight Travel Duration */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Flight Duration
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={getTimeDetails(slice_data.slice_0.info.duration)} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Aircraft Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Aircraft Type */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Aircraft Type
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_0.flight_data.flight_0.info.aircraft_type} sx={styles.chip} />
                        </Typography>


                        {/* Aircraft Model*/}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Aircraft
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_0.flight_data.flight_0.info.aircraft} sx={styles.chip} />
                        </Typography>
                    </Stack>
                </Stack>

                {/* Connections */}
                <Stack sx={styles.connections}>
                    {/* Flight Stops */}
                    <Typography variant="h6" gutterBottom textAlign="center">
                        Connections
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="center">
                        <Chip label={slice_data.slice_0.flight_data.flight_0.info.stop_count} sx={styles.chip} />
                    </Typography>
                </Stack>

                <Divider sx={styles.divider} />

                {/* End Of Trip Information */}
                <Typography variant="h6" color="initial" mt={2}>
                    Return Trip: {slice_data.slice_1?.flight_data?.flight_0?.departure?.datetime?.date_display}
                </Typography>

                <Stack sx={styles.tripInformationContainer}>
                    {/* Origin Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Origin Airport  */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Origin
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip
                                label={slice_data.slice_1.departure.airport.name || slice_data.slice_1.departure.airport.code}
                                avatar={<FlightTakeoffIcon />}
                                sx={styles.chip}
                            />
                        </Typography>

                        {/* Origin Airport Takeoff Time */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Departure Time
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_1.departure.datetime.time_12h} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Destination Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Destination Airport */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Destination
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip
                                label={slice_data.slice_1.arrival.airport.name || slice_data.slice_1.arrival.airport.code}
                                sx={styles.chip}
                                avatar={<FlightLandIcon />}
                            />
                        </Typography>

                        {/* Destination Airport Arrival Time */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Arrival Time
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_1.arrival.datetime.time_12h} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Flight Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Flight Number */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Flight Number
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={`${slice_data.slice_1.airline.code} ${slice_data.slice_1.flight_data.flight_0.info.flight_number}`} sx={styles.chip} />
                        </Typography>

                        {/* Flight Travel Duration */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Flight Duration
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={getTimeDetails(slice_data.slice_1.info.duration)} sx={styles.chip} />
                        </Typography>
                    </Stack>

                    {/* Aircraft Information */}
                    <Stack sx={styles.cardContentItem}>
                        {/* Aircraft Type */}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Aircraft Type
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_1.flight_data.flight_0.info.aircraft_type} sx={styles.chip} />
                        </Typography>


                        {/* Aircraft Model*/}
                        <Typography variant="body2" gutterBottom textAlign="center">
                            Aircraft
                        </Typography>
                        <Typography variant="body2" gutterBottom textAlign="center">
                            <Chip label={slice_data.slice_1.flight_data.flight_0.info.aircraft} sx={styles.chip} />
                        </Typography>
                    </Stack>
                </Stack>

                {/* Connections */}
                <Stack sx={styles.connections}>
                    {/* Flight Stops */}
                    <Typography variant="h6" gutterBottom textAlign="center">
                        Connections
                    </Typography>
                    <Typography variant="body2" gutterBottom textAlign="center">
                        <Chip label={slice_data.slice_1.flight_data.flight_0.info.stop_count} sx={styles.chip} />
                    </Typography>
                </Stack>

                {/* Flight Total Price */}
                <Tooltip title={totalPrice}>
                    <Stack sx={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            Price
                        </Typography>
                        <Typography variant="h6" gutterBottom textAlign="center">
                            {price_details.display_symbol}{price_details.display_total_fare}
                        </Typography>
                    </Stack>
                </Tooltip>
            </CardContent>
        </Card>
    )
};

export default PricelineCard;


