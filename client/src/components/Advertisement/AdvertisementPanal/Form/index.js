import React, { useState, useContext, useEffect } from "react";
import FileBase from "react-file-base64";
import axios from "axios";
import { CategoryConetext } from "../../../../contexts/category";
import { TagConetext } from "../../../../contexts/tags";
import { AdsConetext } from "../../../../contexts/ads";
import { ToastContainer, toast } from "react-toastify";

import {
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@material-ui/core";
import $ from "jquery";
// window.jquery = window.$ = $;
import useStyles from "./style";
import { UserConetext } from "../../../../contexts/user";

export default function FormAds({ ad }) {
  const [user, setUser] = useContext(UserConetext).user;
  const classes = useStyles();
  const [categories, setCategories] = useContext(CategoryConetext).categories;
  const [tags, setTags] = useContext(TagConetext).tags;
  const [ads, setAds] = useContext(AdsConetext).ads;
  const [advertisementAddFlag, setAdvertisementAddFlag] = useState(true);
  const token = localStorage.getItem("token");
  const [adsData, setAdsData] = useState({
    title: "",
    type: "",
    description: "",
    categoryId: "",
    advertiser: `${user.id}`,
    startDate: "",
    endDate: "",
    tags: [],
    photo: "",
  });

  //conver foramt date
  const converDataFunc = (d) => {
    var now = new Date(d);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var date = now.getFullYear() + "-" + month + "-" + day;
    return date;
  };
  useEffect(() => {
    if (ad != "") {
      setAdsData({
        title: ad.title,
        description: ad.description,
        photo: ad.photo,
        type: ad.type,
        tags: [...ad.tags],
        startDate: converDataFunc(ad.startDate),
        endDate: converDataFunc(ad.endDate),
        categoryId: ad.categoryId,
      });
      setAdvertisementAddFlag(false);
    }
  }, [ad]);

  const handelSubmit = (e) => {
    e.preventDefault();
    const url = "https://reach-application-react.herokuapp.com/ads/addAds";

    if (
      adsData.title != "" &&
      adsData.description != "" &&
      adsData.type != "" &&
      adsData.photo != "" &&
      adsData.tags != "" &&
      adsData.startDate != "" &&
      adsData.endDate != "" &&
      adsData.categoryId != ""
    ) {
      if (new Date(adsData.startDate).getTime() < new Date().getTime()) {
        toast.error(" The Start date must be Bigger or Equal to today date ", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false;
      }
      if (new Date(adsData.endDate).getTime() <= new Date().getTime()) {
        toast.error(" The End date must be Bigger of today date ", {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return false;
      }
      if (Date.parse(adsData.endDate) <= Date.parse(adsData.startDate)) {
        toast.error(" End date should be greater than Start date ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        axios
          .post(url, adsData, {
            headers: {
              authorization: token,
            },
          })
          .then(({ data }) => {
            toast.info(" Advertisement added successfuly ", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            clear();
            axios
              .get("https://reach-application-react.herokuapp.com/ads", {
                headers: {
                  authorization: token,
                },
              })
              .then(({ data }) => {
                setAds(data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    $("html,body").animate({ scrollTop: document.body.scrollHeight }, 1000);
  };
  const handelUpdate = (e) => {
    e.preventDefault();
    $("html,body").animate({ scrollTop: 150 }, 1000);
    const url = `https://reach-application-react.herokuapp.com/ads/Ads/Update/${ad._id}`;
    if (adsData.title != "" && adsData.description != "") {
      axios
        .put(url, adsData, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          axios
            .get("https://reach-application-react.herokuapp.com/ads/", {
              headers: {
                authorization: token,
              },
            })
            .then(({ data }) => {
              setAds(data);
              toast.info(" Advertisement updated successfuly ", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setAdvertisementAddFlag(true);
              clear();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const clear = () => {
    setAdsData({
      title: "",
      type: "",
      description: "",
      categoryId: "",
      advertiser: `${user.id}`,
      startDate: "",
      endDate: "",
      tags: [],
      photo: "",
    });
  };
  return (
    <Paper className={classes.paper}>
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
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={advertisementAddFlag ? handelSubmit : handelUpdate}
      >
        <Typography variant="h6" className="customFont">
          Creating a Advertisement
        </Typography>
        <Grid container spacing={2} className={classes.mTopTypography}>
          <Grid item xs={12} sm={6}>
            <TextField
              className="customFont"
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={adsData.title}
              onChange={(e) =>
                setAdsData({ ...adsData, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              value={adsData.description}
              onChange={(e) =>
                setAdsData({ ...adsData, description: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          className={classes.mTopTypography}
          style={{ marginLeft: "5px" }}
        >
          <Grid item xs={12} sm={6}>
            <InputLabel>Category</InputLabel>
            <Select
              value={adsData.categoryId}
              fullWidth
              onChange={(e) =>
                setAdsData({ ...adsData, categoryId: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Tags</InputLabel>
            <Select
              value={adsData.tags}
              fullWidth
              onChange={(e) =>
                setAdsData({
                  ...adsData,
                  tags: [...adsData.tags, e.target.value],
                })
              }
            >
              {tags.map((tag) => (
                <MenuItem key={tag._id} value={tag.name}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container className={classes.mTopTypography} spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="tags"
              variant="outlined"
              label="Tags"
              fullWidth
              value={adsData.tags}
              onChange={(e) => setAdsData({ ...adsData, tags: e.target.value })}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.fileInput}>
                <FileBase
                  id="fileInput"
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setAdsData({ ...adsData, photo: base64 })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Type</InputLabel>
              <Select
                value={adsData.type}
                fullWidth
                onChange={(e) =>
                  setAdsData({ ...adsData, type: e.target.value })
                }
              >
                <MenuItem key="free" value="free">
                  {"free"}
                </MenuItem>
                <MenuItem key="paid" value="paid">
                  {"paid"}
                </MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={new Date()}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={adsData.startDate}
                onChange={(e) =>
                  setAdsData({ ...adsData, startDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={new Date()}
                style={{ width: "100%" }}
                InputLabelProps={{
                  shrink: true,
                }}
                value={adsData.endDate}
                onChange={(e) =>
                  setAdsData({ ...adsData, endDate: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Button
          className={`${classes.buttonSubmit} customFont`}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {advertisementAddFlag ? "Add" : "update"}
        </Button>
        <Button
          style={{ backgroundColor: "#3550e8" }}
          className="customFont"
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
  );
}
