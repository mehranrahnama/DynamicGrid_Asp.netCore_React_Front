import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import "./assets/base.css"

import ElanList from "./components/BaseInfo/Elanat/ElanList";

import {Redirect, BrowserRouter as Router, Switch, Route } from 'react-router-dom';  

function App() {
 
  return (
<Router>  
  <Switch>  
    <Route exact path='/AddElan' component={ElanList} />  
    <Route path='/edit/:id' component={ElanList} />  
    <Route path='/ElanList' component={ElanList} />  
    <Redirect from="/" exact to="/ElanList" />
  </Switch>  
</Router>
  );
}

export default App;
