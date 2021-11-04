import React, {useEffect} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {Link} from "react-router-dom";

const Navbar = () => {

    useEffect(() => {

    })





    return (
            <AppBar position={"fixed"}>
                <Toolbar>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button color={"secondary"} variant={"outlined"}><Link to={"/navbar"}>Navbar</Link></Button>
                        <Button color={"secondary"} variant={"outlined"}>Hello</Button>
                        <Button color={"secondary"} variant={"outlined"}>Hello</Button>
                    </Grid>
                </Toolbar>
            </AppBar>
    );
};

export default Navbar;