import { Stack, Typography } from "@mui/material";
import React from "react";

const Cart = () => {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            height='100vh'
            textAlign="center"
        >
            <Typography variant="h4" color="primary" mb={2} textAlign="center">
                Cart
            </Typography>
        </Stack>
    )
};

export default Cart;
