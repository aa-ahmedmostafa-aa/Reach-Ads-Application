import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import loginStyle from "./style.module.css";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";
import { UserConetext } from "../../../contexts/user";
import { ToastContainer, toast } from "react-toastify";
import authentication from "../../../Authentication/authentication";

export default function Login(props) {
  const classes = useStyles();
  const [user, setUser] = useContext(UserConetext).user;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    const url = "https://reach-application-react.herokuapp.com/User/login";
    if (loginData.email != "" || loginData.password != "") {
      axios
        .post(url, loginData)
        .then(({ data }) => {
          console.log("dataaa :", data);
          setUser(data.user);
          localStorage.setItem("token", data.user.token);
          localStorage.setItem("isAthunticated", true);
          localStorage.setItem("user", JSON.stringify(data.user));
          props.history.replace("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.error(" invalid User !!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const clear = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="vh-100 row justify-content-center align-items-center">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-md-6 col-12">
        <h1 className={`${loginStyle.welcome}`}>
          Welcome to Reach application
        </h1>
      </div>
      <div className="col-md-6 col-12">
        <Paper className={classes.paper}>
          <form
            autoComplete="off"
            noValidate
            className={`${classes.root} ${classes.form}`}
            onSubmit={handelSubmit}
          >
            <Typography className={`${loginStyle.loginHeader}`} variant="h2">
              Login
            </Typography>
            <TextField
              name="email"
              type="email"
              variant="outlined"
              label="Email"
              fullWidth
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <TextField
              name="password"
              type="password"
              variant="outlined"
              label="Password"
              fullWidth
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Login
            </Button>
            <Button
              style={{ backgroundColor: "#3550e8" }}
              variant="contained"
              color="secondary"
              size="large"
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
