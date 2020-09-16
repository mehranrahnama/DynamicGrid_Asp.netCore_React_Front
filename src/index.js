import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./App.css";
import "./index.css";
//import "font-awesome/css/font-awesome.css";
import "./components/styles/bootstrap.css";


ReactDOM.render(
  <BrowserRouter >

    <App  />

  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
