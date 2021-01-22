import React, { useContext, useState } from "react";
import { AdsConetext } from "../../../contexts/ads";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./style";
import FormAds from "./Form";
import AdsData from "./AdvertismentData";
// import CategoriesData from "./CategoriesData";

const AdvetismenetPanal = () => {
  const [ads, setAds] = useContext(AdsConetext).ads;
  const [ad, setAd] = useState("");
  const classes = useStyles();
  const updateAd = (advetisment) => {
    console.log(advetisment);
    setAd(advetisment);
  };

  return (
    <Container maxwidth="lg" className="pt-1">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
          className={`${classes.heading} customFont`}
          variant="h3"
          align="center"
        >
          Advertisement Panal
        </Typography>
      </AppBar>
      <Grow in className="">
        <div className="conatnier">
          <div className="row ">
            <div className="col-md-6 col-12">
              <FormAds ad={ad} />
            </div>
            <div className="col-md-6 col-12">
              <AppBar
                className={classes.headingDataAds}
                position="static"
                color="inherit"
              >
                <Typography
                  className={`${classes.heading} customFont`}
                  variant="h5"
                  align="center"
                >
                  Advertisement Data
                </Typography>
              </AppBar>
              <AdsData updateAd={updateAd} />
            </div>
          </div>
        </div>
      </Grow>
    </Container>
  );
};

export default AdvetismenetPanal;
