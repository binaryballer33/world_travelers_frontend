import React, { SyntheticEvent, useState } from "react";
import AirbnbSearchOptions from "../Airbnb/AirbnbSearchOptions/AirbnbSearchOptions";
import Airbnbs from "../Airbnb/Airbnbs";
import TravelAdvisorSearchOptions from "../TravelAdvisor/TravelAdvisorSearchOptions/TravelAdvisorSearchOptions";
import TravelAdvisorPlaces from "../TravelAdvisor/TravelAdvisorPlaces";
import { Stack, Button, Grid } from "@mui/material";
import styles from "./styles";
import WeatherThreeDayForecast from "../Weather/WeatherThreeDayForecast";
import GeneralInformation from "../GeneralInformation/GeneralInformation";
import PricelineSearchOptions from "../Priceline/PricelineSearchOptions/PricelineSearchOptions";
import Priceline from "../Priceline/Priceline";

enum SEATCH_OPTIONS {
    TRAVELADVISOR = "TRIP ADVISOR",
    AIRBNBS = "AIRBNBS",
    WEATHERFORECAST = "WEATHER FORECAST",
    PRICELINE = "PRICELINE",
    GENERAL_INFORMATION = "GENERAL INFORMATION",
}

const RenderSearchOption = ({ searchOptionToRender }) => {
    switch (searchOptionToRender) {
        case SEATCH_OPTIONS.GENERAL_INFORMATION:
            return <GeneralInformation />
        case SEATCH_OPTIONS.TRAVELADVISOR:
            return (
                <>
                    {/* Render The Travel Advisor Search Options */}
                    <TravelAdvisorSearchOptions />
                    {/* Render The Travel Advisor Places As Cards Below The Map */}
                    <TravelAdvisorPlaces />
                </>
            );
        case SEATCH_OPTIONS.AIRBNBS:
            return (
                <>
                    {/* Render The Airbnb Search Options */}
                    <AirbnbSearchOptions />
                    {/* Render The Airbnbs As Cards Below The Map */}
                    <Airbnbs />
                </>
            );
        case SEATCH_OPTIONS.WEATHERFORECAST:
            {/* Render The Weather Forecast */ }
            return <WeatherThreeDayForecast />

        case SEATCH_OPTIONS.PRICELINE:
            return (
                <>
                    {/* Render The Price Line Search Options */}
                    <PricelineSearchOptions />
                    {/* Render The Priceline Data Returned From The Query */}
                    <Priceline />
                </>
            )
        default:
            return null;
    }
};

const AllSearchOptions = () => {
    const [searchOptionToRender, setSearchOptionToRender] = useState(SEATCH_OPTIONS.GENERAL_INFORMATION);

    const handleClick = (e: SyntheticEvent) => {
        const target = e.currentTarget as HTMLElement; // Type assertion here
        const buttonText = target.textContent as SEATCH_OPTIONS
        setSearchOptionToRender(buttonText!);
    }

    return (
        <Stack>
            {/* Render The Directory Of Search Options */}
            <Grid container sx={styles.searchDirectoryContainer}>
                <Button variant="text" size="large" sx={styles.buttonDirectory} onClick={handleClick}>
                    {SEATCH_OPTIONS.GENERAL_INFORMATION}
                </Button>
                <Button variant="text" size="large" sx={styles.buttonDirectory} onClick={handleClick}>
                    {SEATCH_OPTIONS.PRICELINE}
                </Button>
                <Button variant="text" size="large" sx={styles.buttonDirectory} onClick={handleClick}>
                    {SEATCH_OPTIONS.TRAVELADVISOR}
                </Button>
                <Button variant="text" size="large" sx={styles.buttonDirectory} onClick={handleClick}>
                    {SEATCH_OPTIONS.AIRBNBS}
                </Button>
                <Button variant="text" size="large" sx={styles.buttonDirectory} onClick={handleClick}>
                    {SEATCH_OPTIONS.WEATHERFORECAST}
                </Button>
            </Grid>
            <RenderSearchOption searchOptionToRender={searchOptionToRender} />
        </Stack>
    )
};

export default AllSearchOptions;
