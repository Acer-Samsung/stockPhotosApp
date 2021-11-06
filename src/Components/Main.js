import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Grid, TextField, Toolbar} from "@mui/material";
import {Search} from "@mui/icons-material";
import axios from "axios";
import {ApiKey} from "../App";
import {Link} from "react-router-dom";
import Loader from "./Tools/Loader";
import {useStyles} from "../Classes/Navbar";

const Main = () => {

    const [photos, setPhotos] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const classes = useStyles();
    
    useEffect(() => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=gtr&page=1&per_page=50&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    const [tag,setTag] = useState("");

    const handleSearchChange = (e) => {
        let value = e.target.value;
        setTag(value);
    }

    const SearchTag = () => {
        setIsLoading(true)
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=${tag}&page=1&per_page=50&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }
    
    return (
        <Grid container>
            <AppBar position={"static"} style={{margin: "0 0 10px 0"}}>
                <Toolbar>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Box display={"flex"} width={"40%"} justifyContent={"space-between"}>

                                    <Button color={"secondary"} variant={"outlined"}><Link className={classes.Link}
                                                                                           to={"#"}>Navbar</Link></Button>
                                    <Button color={"secondary"} variant={"outlined"}><Link className={classes.Link}
                                                                                           to={"#"}>Navbar</Link></Button>
                                    <Button color={"secondary"} variant={"outlined"}><Link className={classes.Link}
                                                                                           to={"#"}>Navbar</Link></Button>

                                </Box>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Box display={"flex"}>

                                    <TextField className={classes.Input} InputProps={{ inputProps: {}, style: { borderTopRightRadius: 0,borderBottomRightRadius: 0 }, }} style={{outline:"none"}} id="search" label="Search" color={"secondary"}
                                              onChange={(e)=>handleSearchChange(e)} variant="outlined"/>
                                    <Button variant={"outlined"} color={"secondary"} className={classes.SearchButton} onClick={SearchTag}><Search/></Button>
                                </Box>
                            </Grid>
                        </Box>

                    </Grid>
                </Toolbar>
            </AppBar>
            {
                isLoading ? <Loader/> : <>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>

                        <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"} alignContent={"flex-start"}
                             flexWrap={"wrap"}>
                            {photos.map((item, index, array) => (
                                <div>
                                    <Link to={`/posts/${item.id}`} target={"_blank"} className={classes.Link}>
                                        <img
                                            style={{width: "auto", height: 'auto'}}
                                            src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                                            alt="404! Error!" className=""

                                        />
                                    </Link>

                                </div>


                            ))}

                        </Box>



                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/></>
            }


        </Grid>
    );
};

export default Main;