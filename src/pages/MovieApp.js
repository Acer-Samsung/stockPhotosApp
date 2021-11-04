import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box, Modal, Typography} from "@mui/material";
import {Link, Route} from "react-router-dom";
import Test from "../Components/Test";



const MovieApp = () => {

    const ApiKey = process.env.REACT_APP_API_KEY;
    const [photos, setPhotos] = useState([]);

        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

    useEffect(() => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=gtr&page=1&per_page=50&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
            }).catch((err) => {
            console.log(err)
        }).finally(() => {

        })
    }, [ApiKey]);

    return (
        <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} alignContent={"flex-start"}
             flexWrap={"wrap"}>
            {photos.map((item, index, array) => (
                <div>

                    {/*<div className="" style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>*/}
                    {/*    <h3 style={{marginRight: "15px"}}>{index + 1}</h3>*/}
                    {/*    {item.title.length > 0 ? item.title : "No title"}*/}
                    {/*</div>*/}



                    <Link to={`/posts/${item.id}`}>
                    <img
                        style={{width: "auto", height: 'auto'}}
                        src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                        alt="404! Error!" className=""

                    />
                    </Link>

                </div>


            ))}

        </Box>

    );
};

export default MovieApp;