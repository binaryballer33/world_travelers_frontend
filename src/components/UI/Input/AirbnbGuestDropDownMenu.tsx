import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles";

const AirbnbGuestDropDownMenu = ({ inputName, value, setValue }) => {
    const dispatch = useDispatch()
    return (
        <Grid item>
            <Typography variant="body2" color="primary" textAlign="center">{inputName}</Typography>
            <FormControl sx={styles.input}>
                <Select
                    id="type"
                    value={value}
                    onChange={(e) => dispatch(setValue(Number(e.target.value)))}
                    name={inputName}
                >
                    <MenuItem value="0">0</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
};

export default AirbnbGuestDropDownMenu;
