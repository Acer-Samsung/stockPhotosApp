import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, dividerClasses, Grid, TextField, Toolbar} from "@mui/material";
import {ArrowLeft, ArrowRight, Search} from "@mui/icons-material";
import axios from "axios";
import {ApiKey} from "../App";
import {Link} from "react-router-dom";
import Loader from "./Tools/Loader";
import {useStyles} from "../Classes/Navbar";
import {restrictedWords} from "./Tools/RestrictedWords";

const Main = (props) => {

    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [pages, setPages] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);

    const getData = () => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=cars&page=${currentPage}&per_page=200&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
                setPages(res.data.photos.pages)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    const [tag, setTag] = useState("");

    const handleSearchChange = (e) => {
        let value = e.target.value;
        setTag(value);
    }

    const SearchTag = () => {
        setIsLoading(true)
        restrictedWords.map((word) => {
            if (word === tag) {
                var createA = document.createElement('a');
                createA.setAttribute('href', "/restrictedWord");
                createA.click();
            }
        })


        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&tags=${tag}&page=${currentPage}&per_page=200&format=json&nojsoncallback=1`)
            .then(res => {
                console.log(res);
                setPhotos(res.data.photos.photo);
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setIsLoading(true)
            currentPage = currentPage - 1;
            setCurrentPage(currentPage)
            tag.length > 0 ? SearchTag() : getData();
        }
    }

    const nextPage = () => {
        if (currentPage < pages) {
            setIsLoading(true)
            currentPage = currentPage + 1;
            setCurrentPage(currentPage)
            tag.length > 0 ? SearchTag() : getData();
        }
    }


    return (
        <Grid container>
            <AppBar position={"fixed"} style={{margin: "0 0 10px 0"}}>
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

                                    <TextField className={classes.Input} InputProps={{
                                        inputProps: {},
                                        style: {borderTopRightRadius: 0, borderBottomRightRadius: 0},
                                    }} style={{outline: "none"}} id="search" label="Search" color={"secondary"}
                                               onChange={(e) => handleSearchChange(e)} variant="outlined"/>
                                    <Button variant={"outlined"} color={"secondary"} className={classes.SearchButton}
                                            onClick={SearchTag}><Search/></Button>
                                </Box>
                            </Grid>
                        </Box>

                    </Grid>
                </Toolbar>
            </AppBar>
            {
                isLoading ? <Loader/> : <>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/>
                    <Grid item style={{marginTop: "70px"}} xs={10} sm={10} md={10} lg={10} xl={10}>

                        <Box display={"flex"} justifyContent={"space-evenly"} alignItems={"center"}
                             alignContent={"flex-start"}
                             flexWrap={"wrap"}>
                            {photos.map((item, index, array) => (
                                <div> {item.server && item.farm && item.id ?
                                    <Link to={`/posts/${item.id}`} target={"_blank"} className={classes.Link}>

                                        <img
                                            style={{width: "auto", height: 'auto'}}
                                            src={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
                                            alt="img not found" className=""

                                        />
                                    </Link> : ""}
                                </div>


                            ))}

                        </Box>

                        <Box width={"100%"} style={{
                            display: 'flex',
                            justifyContent: "center",
                            margin: "30px 0",
                            alignItems: 'center'
                        }}>
                            <Button style={{width: "10px"}} onClick={prevPage}><ArrowLeft/></Button>
                            <Box style={{
                                border: '1px solid black',
                                width: "30px",
                                height: "30px",
                                padding: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>{currentPage}</Box>
                            <Button style={{width: "10px"}} onClick={nextPage}><ArrowRight/></Button>
                        </Box>

                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}/></>
            }


        </Grid>
    );
};

export default Main;