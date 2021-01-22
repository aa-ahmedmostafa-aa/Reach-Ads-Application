import React, { useContext, useEffect, useState } from "react";
import { CategoryConetext } from "../../contexts/category";
import { TagConetext } from "../../contexts/tags";
import { AdsConetext } from "../../contexts/ads";
import axios from "axios";
import "./style.css";
import { NavLink, useHistory } from "react-router-dom";
import { UserConetext } from "../../contexts/user";

const Navbar = () => {
  const [user, setUser] = useContext(UserConetext).user;
  const [categories, setCategories] = useContext(CategoryConetext).categories;
  const [tags, setTags] = useContext(TagConetext).tags;
  const [ads, setAds] = useContext(AdsConetext).ads;
  let history = useHistory();

  // window.addEventListener("scroll", () => {
  //   document.getElementById("navBarReach").style.backgroundColor = "#cac6c6";
  // });
  const getAllCategories = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://reach-application-react.herokuapp.com/category", {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log("response :", data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllAds = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://reach-application-react.herokuapp.com/ads", {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log("response :", data);
        setAds(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllTags = () => {
    const token = localStorage.getItem("token");
    axios
      .get("https://reach-application-react.herokuapp.com/Tags", {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log("response :", data);
        setTags(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllCategories();
    getAllTags();
  }, []);

  const handelLogout = () => {
    localStorage.setItem("token", "");

    localStorage.setItem("user", {});
    localStorage.setItem("isAthunticated", "false");
    history.replace("/home");
    setUser({});
  };

  return (
    <React.Fragment>
      <div id="navBarReach" className="fixed-top">
        <nav className="navbar    navbar-expand-lg navbar-light">
          <div className="container">
            <NavLink className="navbar-brand" to="/home">
              Reach App
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ">
               
                {user.roleId == 1 && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/CategoryAdmin">
                      Category
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink className="nav-link" to="/AdsPanal">
                    Advertisement
                  </NavLink>
                </li>
                {user.roleId == 1 && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/TagsAdmin">
                      Tags
                    </NavLink>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav   ml-auto">
                <li className="nav-item ">
                  <span
                    className="nav-link logout"
                    style={{ cursor: "pointer" }}
                    onClick={handelLogout}
                  >
                    logout
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};
export default Navbar;
