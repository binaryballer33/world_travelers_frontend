import React, { SyntheticEvent, useState } from "react";
import AirbnbSearchOptions from "../Airbnb/AirbnbSearchOptions/AirbnbSearchOptions";
import Airbnbs from "../Airbnb/Airbnbs";
import TravelAdvisorSearchOptions from "../TravelAdvisor/TravelAdvisorSearchOptions/TravelAdvisorSearchOptions";
import TravelAdvisorPlaces from "../TravelAdvisor/TravelAdvisorPlaces";
import { Stack, Button } from "@mui/material";

enum SEATCH_OPTIONS {
    TRAVELADVISOR = "TRAVEL ADVISOR",
    AIRBNBS = "AIRBNBS",
    WEATHERFORECAST = "WEATHER FORECAST",
    FLIGHTS = "FLIGHTS"
}

const AllSearchOptions = () => {
    const [componentToRender, setComponentToRender] = useState("traveladvisor");

    const handleClick = (e: SyntheticEvent) => {
        const target = e.currentTarget as HTMLElement; // Type assertion here
        const buttonText = target.textContent
        setComponentToRender(buttonText!);
    }

    return (
        <Stack>
            <Stack flexDirection="row" justifyContent="center" mb={5}>
                <Button variant="text" color="primary" size="large" sx={{ p: 2 }} onClick={(e) => handleClick(e)}>
                    {SEATCH_OPTIONS.FLIGHTS}
                </Button>
                <Button variant="text" color="primary" size="large" sx={{ p: 2 }} onClick={(e) => handleClick(e)}>
                    {SEATCH_OPTIONS.TRAVELADVISOR}
                </Button>
                <Button variant="text" color="primary" size="large" sx={{ p: 2 }} onClick={(e) => handleClick(e)}>
                    {SEATCH_OPTIONS.AIRBNBS}
                </Button>
                <Button variant="text" color="primary" size="large" sx={{ p: 2 }} onClick={(e) => handleClick(e)}>
                    {SEATCH_OPTIONS.WEATHERFORECAST}
                </Button>
            </Stack>

            <Stack>
                {/* Render The Travel Advisor Search Options */}
                {componentToRender === SEATCH_OPTIONS.TRAVELADVISOR && <TravelAdvisorSearchOptions />}
                {/* Render The Travel Advisor Places As Cards Below The Map */}
                {componentToRender === SEATCH_OPTIONS.TRAVELADVISOR && <TravelAdvisorPlaces />}

                {/* Render The Airbnb Search Options */}
                {componentToRender === SEATCH_OPTIONS.AIRBNBS && <AirbnbSearchOptions />}
                {/* Render The Airbnbs As Cards Below The Map */}
                {componentToRender === SEATCH_OPTIONS.AIRBNBS && <Airbnbs />}

                {/* Render The Weather Forecast */}
                {/* {componentToRender === "weatherforecast" && <Link to="/weatherforecast">Weather Forecast</Link>} */}

                {/* Render The Flights */}
                {/* {componentToRender === "flights" && <Link to="/flights">Flights</Link>} */}
            </Stack>

        </Stack>
    )
};

export default AllSearchOptions;
