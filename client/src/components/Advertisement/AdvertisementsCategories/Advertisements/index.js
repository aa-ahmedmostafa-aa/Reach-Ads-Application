import React, { useState, useEffect } from "react";
import axios from "axios";
import adsStyle from "./ads.module.css";
import { Grid, CircularProgress, AppBar, Typography } from "@material-ui/core";

import useStyles from "./style";
import Advertisement from "./Advertisment";

const Advertisements = (props) => {
  const classes = useStyles();
  const [ads, setAds] = useState([]);
  const [loding, setLoding] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  let arrSearch = [];
  let catId = props.match.params.id;
  let getAdsCategory = "https://reach-application-react.herokuapp.com/ads/AdsCategory/";
  const token = localStorage.getItem("token");
  useEffect(() => {
    console.log("Api : ", getAdsCategory + catId);
    axios
      .get(getAdsCategory + catId, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log("response :", data);
        setLoding(true);
        setAds(data.Ads);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [catId]);
  //Search about Ads
  if (searchWord != "") {
    let temp = ads.filter((ad) =>
      ad.tags.join().toLowerCase().includes(searchWord.toLowerCase())
    );

    arrSearch = [...temp];
  }

  return !loding ? (
    <div className=" vh-100 d-flex justify-content-center align-items-center">
      <CircularProgress />
    </div>
  ) : (
    <div className={`container`}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <section className="container pt-3">
          <div className="row">
            <div className="col-md-6">
              <Typography
                className={classes.heading}
                variant="h4"
                align="center"
              >
                Advertisements
              </Typography>
            </div>
            <div className="col-md-6">
              <input
                id="SearchByWordAllMovies"
                className={`${adsStyle.customInputSearch} mb-3`}
                placeholder="Search ..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
          </div>
        </section>
      </AppBar>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        <Grid
          className={`${classes.container} mt-2`}
          container
          alignItems="stretch"
          spacing={3}
        >
          {arrSearch.length
            ? arrSearch.map((ad) => (
                <Grid key={ad._id} item xs={12} sm={4} md={4}>
                  <Advertisement advertisement={ad} />
                </Grid>
              ))
            : ads.map((ad) => (
                <Grid key={ad._id} item xs={12} sm={4} md={4}>
                  <Advertisement advertisement={ad} />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Advertisements;
