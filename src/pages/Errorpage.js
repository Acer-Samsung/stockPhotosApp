import React from 'react';
import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useStyles} from "../Classes/Navbar";

const Errorpage = (props) => {
    console.log(props)
    const classes = useStyles();
    return (
        <div style={{textAlign: "center"}}>
            <Typography variant={"h1"} fontWeight={600} color={"error"} fontSize={150} style={{marginTop: "15vh"}}>404
                Not Found!</Typography>
            <Button variant={"outlined"} color={"error"} style={{
                width: "200px",
                height: "100px",
                lineHeight: "30px",
                fontSize: "32px",
                border: "2px solid red",
                marginTop: "40px"
            }}><Link to={"/"} className={classes.Link} style={{color: "#e00707"}}>Go Back</Link></Button>
        </div>
    );
};

export default Errorpage;