import React from "react";
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import styles from "./styles";

const CurrencyDropdownMenu = ({ inputName, value, setCurrency }) => {
    const dispatch = useDispatch()

    return (
        <Grid item>
            <Typography variant="body2" color="primary" textAlign="center">{inputName}</Typography>
            <FormControl sx={styles.input}>
                <Select
                    id="type"
                    value={value}
                    onChange={(e) => dispatch(setCurrency(e.target.value))}
                    name={inputName}
                >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="BRL">BRL</MenuItem>
                    <MenuItem value="MXN">MXN</MenuItem>
                    <MenuItem value="COP">COP</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                    <MenuItem value="CNY">CNY</MenuItem>
                    <MenuItem value="ZAR">ZAR</MenuItem>
                    <MenuItem value="VND">VND</MenuItem>
                    <MenuItem value="THB">THB</MenuItem>
                    <MenuItem value="PHP">PHP</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
};

export default CurrencyDropdownMenu;
