import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import Loader from "./Tools/Loader";

const Test = (props) => {
    // console.log(props)
    const screen = window.screen;
    // console.log(screen)
    var reg = /\d+/;
    let photoId = props.match.url.toString().match(reg);
    const ApiKey = process.env.REACT_APP_API_KEY;


    const [photosSizes, setPhotosSizes] = useState([]);

    function getsize() {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${ApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`)
                // axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${ApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`)

                .then(res => {
                    console.log(res)
                    setPhotosSizes(res.data.sizes.size)
                }).catch((err) => {
                console.log(err)
                reject("kitob")
            })
                .finally(()=>{
                    setIsLoading(false)
                })


        })
    }
    const getInfo = () => {
      axios.get(` https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${ApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`)
          .then((res)=>{
              console.log(res)
          })
    }

    useEffect(() => {
        getsize();
        getInfo()
    }, [])

    function downloadImage(src) {
        const img = new Image();
        img.crossOrigin = 'anonymous';  // This tells the browser to request cross-origin access when trying to download the image data.
        // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
        img.src = src;
        img.onload = () => {
            // create Canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // create a tag
            const a = document.createElement('a');
            a.download = `${src}`;
            a.href = canvas.toDataURL('image/jpg');
            a.click();
        };
    }

    const [isLoading,setIsLoading] = useState(true);
    return (

        <div>
            {
                isLoading ? <Loader/> : <Grid container marginTop={10}>
                    <Grid item xs={"12"} sm={"12"} md={"12"} lg={"6"} xl={"6"}>
                        <Box style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <img src={photosSizes.length > 0 ? photosSizes[7].source : ""} alt="404"/>
                        </Box>
                    </Grid>
                    <Grid item xs={"12"} sm={"12"} md={"12"} lg={"6"} xl={"6"}>
                        <Box display={"flex"} flexDirection={"column"} paddingX={2}>
                            {photosSizes.map((item) => (
                                <Button style={{margin: "5px 0"}} variant={"outlined"} onClick={() => {
                                    downloadImage(item.source)
                                }}>{item.label} ({item.width}x{item.height})</Button>
                            ))}
                        </Box>

                    </Grid>
                </Grid>
            }

        </div>
    );
};

export default Test;