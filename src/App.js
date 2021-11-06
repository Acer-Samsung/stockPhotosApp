import React from 'react';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Test from "./Components/Test";
import "lightgallery.js/dist/css/lightgallery.css";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Classes/Theme";


export const ApiKey = process.env.REACT_APP_API_KEY;

function App() {
    require('dotenv').config()

    return (

        <ThemeProvider theme={Theme}>

            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>
                    <Route exact path={"/posts/:id"} component={Test}/>
                </Switch>
            </BrowserRouter>
</ThemeProvider>
    );
}

export default App;
