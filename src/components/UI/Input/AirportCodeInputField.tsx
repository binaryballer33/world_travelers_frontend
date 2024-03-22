import React from "react";
import { useDispatch } from "react-redux";
import { BoxProps, Stack, TextField, Typography } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type AirportCodeInputFieldProps = BoxProps & {
    airportCode: string;
    setAirportCode: ActionCreatorWithPayload<string, string>
    inputName: string
}

const AirportCodeInputField = ({ airportCode, setAirportCode, inputName }: AirportCodeInputFieldProps) => {
    const dispatch = useDispatch()

    return (
        <Stack ml={2}>
            <Typography variant="body2" color="primary" textAlign="center" mb={1}>{inputName}</Typography>
            <TextField
                value={airportCode}
                onChange={(e) => dispatch(setAirportCode(e.target.value))}
                placeholder="3 Letter"
                sx={{ mb: 4.1, width: 110 }}
            />
        </Stack>
    )
}

export default AirportCodeInputField;
