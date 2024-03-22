import { BoxProps, Button, Grid } from "@mui/material";
import React from "react";
import styles from './styles'

type QueryButtonProps = BoxProps & {
    text: string
    isFetching: boolean
    executeQueryHandler: () => Promise<void>
}

const QueryButton = ({ text, isFetching, executeQueryHandler }: QueryButtonProps) => {
    return (
        <Grid item>
            {/* Execute The Search Query Button */}
            <Button variant="contained" onClick={executeQueryHandler} disabled={isFetching} sx={styles.searchButton}>
                {isFetching ? "Searching" : text}
            </Button>
        </Grid>
    )
};

export default QueryButton;
