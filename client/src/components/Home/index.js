import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Typed from "react-typed";
import { UserConetext } from "../../contexts/user";
import "./style.css";

export default function Home() {
  const [user, setUser] = useContext(UserConetext).user;
  useEffect(() => {
    try {
      // Parse a JSON
      if (localStorage.getItem("user") == null) {
        setUser({});
      } else {
        let userLoggedInDataString = localStorage.getItem("user");

        setUser(JSON.parse(userLoggedInDataString));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="layer">
        <div className="header_content d-flex justify-content-center align-items-center h-100">
          <div className="subContent text-center text-white">
            <h1 className="welcome">
              Welcome to <span className="ReachSpan">Reach</span> application
            </h1>

            <div className="area mb-4">
              <h2>
                I'M <span className="type"></span>
              </h2>
            </div>
            <Typed
              className="welcome"
              strings={["AHMED MOSTAFA", "A DEVELOPER"]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />

            <p>
              this is web shop application that you can Advertise to your
              bussiness or your products
              <br />
              created by Reach company.
            </p>
            {!user.id && (
              <NavLink className="Download" to="/login">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
