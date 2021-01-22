import React, { useState, useEffect, useContext } from "react";
import { CategoryConetext } from "../../contexts/category";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./style.css";
import $ from "jquery";
window.jquery = window.$ = $;
export default function Sidebar() {
  const [categories, setCategories] = useContext(CategoryConetext).categories;

  const animateFunc = () => {
    var nvWidth = 0,
      isTrue = !0;

    $(".strip-toggel-menu").click(() => {
      return isTrue
        ? ($(".nav-tab-menu").addClass("open-menu").removeClass("close-menu"),
          (nvWidth = $(".nav-tab-menu").width() - 10),
          $(".strip-header-nav").css("left", nvWidth),
          $(".fa-align-justify").toggleClass("fa-times"),
          $(".nav-tab-menu .item1").animate(
            { opacity: "1", paddingTop: "25px" },
            1100
          ),
          $(".nav-tab-menu .item2").animate(
            { opacity: "1", paddingTop: "25px" },
            1200
          ),
          $(".nav-tab-menu .item3").animate(
            { opacity: "1", paddingTop: "25px" },
            1300
          ),
          $(".nav-tab-menu .item4").animate(
            { opacity: "1", paddingTop: "25px" },
            1400
          ),
          $(".nav-tab-menu .item5").animate(
            { opacity: "1", paddingTop: "25px" },
            1500
          ),
          $(".nav-tab-menu .item6").animate(
            { opacity: "1", paddingTop: "25px" },
            1600
          ),
          (isTrue = !isTrue))
        : ($(".nav-tab-menu").addClass("close-menu").removeClass("open-menu"),
          $(".fa-align-justify").toggleClass("fa-times"),
          $(".strip-header-nav").css("left", 0),
          $(".nav-tab-menu li").animate(
            { opacity: "0", paddingTop: "500px" },
            500
          ),
          (isTrue = !isTrue));
    });
  };
  useEffect(() => {
    if ($) {
      animateFunc();
    }
  }, []);
  return (
    <section>
      <div className="strip-header-nav">
        <div className="strip-logo">
          <img src="" />
        </div>
        <div className="strip-toggel-menu">
          <i className="fa fa-align-justify"></i>
        </div>

        <div className="strip-social-icon">
          <div className="strip-lang">
            <span>
              <i className="fas fa-globe"></i>
            </span>
          </div>

          <div className="strip-share">
            <span>
              <i className="fas fa-share-alt"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="nav-tab-menu">
        <div className="nav-item">
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="item1">
                <NavLink to={`/Advertisement/${category._id}`}>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-social-item">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fas fa-globe"></i>
          </a>
          <div className="pt-3">
            <span>Copyright Â© 2021 All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
