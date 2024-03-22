import React from "react";
import {
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
} from '@mui/material'
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import styles from './styles'

const PricelineCard = ({ data }) => {
    return (
        <Card elevation={6} sx={styles.cardContainer}>
            <CardContent>
                {/* place name */}
                <Typography gutterBottom variant="h5" textAlign="center">
                    Test Card Content
                </Typography>

                <Typography component="legend">
                    Test Card Content
                </Typography>
            </CardContent>

            {/* Links To Trip Advisor And Place Website */}
            <CardActions sx={styles.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => window.open("filler text", '_blank')}
                >
                    Test Card Action Button
                </Button>
            </CardActions>
        </Card>
    )
};

export default PricelineCard;


