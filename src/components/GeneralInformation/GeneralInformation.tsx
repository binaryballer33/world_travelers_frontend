import React, { useEffect } from "react";
import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material/'
import styles from "./styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../types/State";

const GeneralInformation = () => {
    const { coords } = useSelector((state: RootState) => state.maps)
    const atms = `https://www.google.com/maps/search/atms/@${coords.lat},${coords.lng}`
    const hospitals = `https://www.google.com/maps/search/hospitals/@${coords.lat},${coords.lng}`
    const pharmacies = `https://www.google.com/maps/search/pharmacy/@${coords.lat},${coords.lng}`
    const transit = `https://www.google.com/maps/search/Transit+stations/@${coords.lat},${coords.lng}`
    const foodOpenNear = `https://www.google.com/maps/search/food+open+near+me/@${coords.lat},${coords.lng}`
    const hotels = `https://www.google.com/maps/search/hotels/@${coords.lat},${coords.lng}`

    useEffect(() => {
        console.log(coords);
        console.log(atms);

    }, [coords])

    return (
        <Stack sx={styles.generalInformationContainer} gap={2} mb={5}>

            {/* Side Bar */}
            <Stack sx={styles.sideContent}>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>Hotels:</Typography>
                    <Button variant="contained" component={Link} to={hotels} target="_blank" sx={styles.informationButton}>Find Hotels</Button>
                </Stack>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>ATMs:</Typography>
                    <Button variant="contained" component={Link} to={atms} target="_blank" sx={styles.informationButton}>Find ATMs</Button>
                </Stack>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>Hospitals:</Typography>
                    <Button variant="contained" component={Link} to={hospitals} target="_blank" sx={styles.informationButton}>Find Hospitals</Button>
                </Stack>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>Pharmacies:</Typography>
                    <Button variant="contained" component={Link} to={pharmacies} target="_blank" sx={styles.informationButton}>Find Pharmacies</Button>
                </Stack>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>Transit Stations:</Typography>
                    <Button variant="contained" component={Link} to={transit} target="_blank" sx={styles.informationButton}>Find Transit</Button>
                </Stack>
                <Stack sx={styles.informationContainer}>
                    <Typography variant="h6" sx={styles.informationHeader}>Food Open Near Me:</Typography>
                    <Button variant="contained" component={Link} to={foodOpenNear} target="_blank" sx={styles.informationButton}>Find Food</Button>
                </Stack>
            </Stack>

            {/* Main Content */}
            <Stack sx={styles.mainContent}>
                <Typography variant="h4" sx={styles.header}>General Information</Typography>

                <Stack sx={styles.mainContentItems}>
                    <Card sx={styles.cardContainer}>
                        <CardMedia image="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" sx={styles.cardMedia} />
                        <CardContent sx={styles.cardContent}>
                            <Typography variant="body1" color="primary">Don't Forget Your Documents</Typography>
                        </CardContent>
                    </Card>

                    <Card sx={styles.cardContainer}>
                        <CardMedia image="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" sx={styles.cardMedia} />
                        <CardContent sx={styles.cardContent}>
                            <Typography variant="body1" color="primary">
                                Don't Forget To Check If The Country Has Visa Requirements For Your Country
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={styles.cardContainer}>
                        <CardMedia image="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" sx={styles.cardMedia} />
                        <CardContent sx={styles.cardContent}>
                            <Typography variant="body1" color="primary">Don't Forget To Check-In</Typography>
                        </CardContent>
                    </Card>

                    <Card sx={styles.cardContainer}>
                        <CardMedia image="https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-600nw-2179364083.jpg" sx={styles.cardMedia} />
                        <CardContent sx={styles.cardContent}>
                            <Typography variant="body1" color="primary">Don't Forget To Buy Your Lodging Before You Get There</Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
        </Stack>
    )
};

export default GeneralInformation;
