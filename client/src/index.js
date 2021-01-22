import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

import { UserContextProvider } from "./contexts/user";
ReactDOM.render(
  <Router>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Router>,
  document.getElementById("root")
);
