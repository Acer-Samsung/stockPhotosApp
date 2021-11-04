import React from 'react';
import {Box, Grid} from "@mui/material";
import MovieApp from "../pages/MovieApp";

const Main = () => {
    return (
        <Grid container>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Box>
                    <MovieApp/>
                </Box>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>

        </Grid>
    );
};

export default Main;