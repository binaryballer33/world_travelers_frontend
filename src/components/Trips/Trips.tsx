import { Stack, Typography } from "@mui/material";
import React from "react";

const Trips = () => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height='100vh'
            textAlign="center"
        >
            <Typography variant="h4" color="primary" mb={2} textAlign="center">
                User Saved Trips
            </Typography>
        </Stack>
    )
};

export default Trips;
