import React from 'react';
import './loader.css'
import {Box} from "@mui/material";

const Loader = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100vw"} height={"70vh"}>
            <div className="boxes">
                <div className="box">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="box">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="box">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="box">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </Box>
    );
};

export default Loader;