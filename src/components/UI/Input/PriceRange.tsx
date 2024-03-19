import React from "react";
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { setMaxPrice, setMinPrice } from "../../../redux/airbnbSlice";

type PriceRangeProps = {
    priceRange: number;
} & ({ minPrice: true; maxPrice?: never } | { maxPrice: true; minPrice?: never }); // only one of these props can be given not both

const PriceRange = ({ minPrice, maxPrice, priceRange }: PriceRangeProps) => {
    const dispatch = useDispatch()
    // create the dispatch function based on whether minPrice or maxPrice is true
    const setPriceRange = minPrice ? (priceRange: number) => dispatch(setMinPrice(priceRange)) : (priceRange: number) => dispatch(setMaxPrice(priceRange));
    const header = minPrice ? "Min Price" : (maxPrice ? "Max Price" : "Price Range");

    return (
        <Grid item>
            <Typography variant="body2" color="primary" textAlign="center">{header}</Typography>
            <FormControl sx={styles.input}>
                <Select
                    id="type"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={150}>150</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={750}>750</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={1250}>1250</MenuItem>
                    <MenuItem value={1500}>1500</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={2500}>2500</MenuItem>
                    <MenuItem value={3000}>3000</MenuItem>
                    <MenuItem value={4000}>4000</MenuItem>
                    <MenuItem value={5000}>5000</MenuItem>
                    <MenuItem value={6000}>6000</MenuItem>
                    <MenuItem value={7000}>7000</MenuItem>
                    <MenuItem value={8000}>8000</MenuItem>
                    <MenuItem value={9000}>9000</MenuItem>
                    <MenuItem value={10000}>10000</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    )
};

export default PriceRange;

