import { Stack, Typography } from "@mui/material";
import React from "react";

const TripCard = () => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height='100vh'
            textAlign="center"
        >
            <Typography variant="h4" color="primary" mb={2} textAlign="center">
                TripCard
            </Typography>
        </Stack>
    )
};

export default TripCard;
