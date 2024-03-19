import React from "react";
import { useDispatch } from "react-redux";
import { BoxProps, Stack, TextField, Typography } from "@mui/material";
import { setCheckin, setCheckout } from "../../../redux/airbnbSlice";

type StayDurationDateProps = BoxProps & {
    date: string;
} & ({ checkin: true; checkout?: never } | { checkout: true; checkin?: never }); // checkin or checkout, but not both

const StayDurationDate = ({ date, checkin, checkout }: StayDurationDateProps) => {
    const dispatch = useDispatch()
    const setDate = checkin ? (date: string) => dispatch(setCheckin(date)) : (date: string) => dispatch(setCheckout(date));
    const header = checkout ? "Check Out" : "Check In";

    return (
        <Stack ml={2}>
            <Typography variant="body2" color="primary" textAlign="center" mb={1}>{header}</Typography>
            <TextField
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                sx={{ mb: 4.1, width: 110 }}
            />
        </Stack>
    )
}

export default StayDurationDate;
