import React from "react";
import { useDispatch } from "react-redux";
import { BoxProps, Stack, TextField, Typography } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type DateInputFieldProps = BoxProps & {
    date: string;
    setDate: ActionCreatorWithPayload<string, string>
    inputName: string
}

const DateInputField = ({ date, setDate, inputName }: DateInputFieldProps) => {
    const dispatch = useDispatch()

    return (
        <Stack ml={2}>
            <Typography variant="body2" color="primary" textAlign="center" mb={1}>{inputName}</Typography>
            <TextField
                value={date}
                onChange={(e) => dispatch(setDate(e.target.value))}
                placeholder="YYYY-MM-DD"
                sx={{ mb: 4.1, width: 110 }}
            />
        </Stack>
    )
}

export default DateInputField;
