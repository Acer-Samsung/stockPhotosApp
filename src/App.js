import React from 'react';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Test from "./Components/Test";
import "lightgallery.js/dist/css/lightgallery.css";

function App() {
    require('dotenv').config()

    return (

            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={HomePage}/>
                    <Route exact path={"/navbar"} component={Navbar}/>
                    <Route exact path={"/posts/:id"} component={Test}/>
                </Switch>
            </BrowserRouter>

    );
}

export default App;
