import { useContext, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserConetext } from "../contexts/user";
import authentication from "./authentication";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useContext(UserConetext).user;
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        let isAthunticated = localStorage.getItem("isAthunticated");

        let user = JSON.parse(localStorage.getItem("user"));
        if (isAthunticated == "true") {
          if (
            (props.location.pathname == "/TagsAdmin" ||
              props.location.pathname == "/CategoryAdmin") &&
            user.roleId != "1"
          ) {
            console.log("unauthoraized");
            return (
              <Redirect
                to={{
                  pathname: "/unauthoraized",
                  state: { from: props.location },
                }}
              />
            );
          } else {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
