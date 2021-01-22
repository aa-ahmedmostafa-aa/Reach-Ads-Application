import React, { useContext, useState, useEffect } from "react";
import adsStyle from "./style.module.css";
import axios from "axios";
import { AdsConetext } from "../../../../contexts/ads";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserConetext } from "../../../../contexts/user";
import { ToastContainer, toast } from "react-toastify";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#464646",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function AdsData({ updateAd }) {
  const [user, setUser] = useContext(UserConetext).user;
  const [ads, setAds] = useContext(AdsConetext).ads;
  const [searchWord, setSearchWord] = useState("");
  let arrSearch = [];
  const [loding, setLoding] = useState(true);
  const classes = useStyles();
  const token = localStorage.getItem("token");

  //check if user admin or not
  useEffect(() => {
    if (user.roleId != 1) {
      axios
        .get(`https://reach-application-react.herokuapp.com/ads/AdvertisementsUser/${user.id}`, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          if (!data.Ads.length) {
            setAds([]);
          } else {
            setAds(data.Ads);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
    }
  }, [ads]);

  const deleteAds = (id) => {
    console.log("id : ", id);
    axios
      .delete(`https://reach-application-react.herokuapp.com/ads/deleteAds/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        toast.info(" Advertisement deleted successfuly ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (user.roleId != 1) {
          axios
            .get(`https://reach-application-react.herokuapp.com/ads/AdvertisementsUser/${user.id}`, {
              headers: {
                authorization: token,
              },
            })
            .then(({ data }) => {
              if (!data.Ads.length) {
                setLoding(false);
                setAds([]);
                setLoding(true);
              } else {
                setLoding(false);
                setAds(data.Ads);
                setLoding(true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //search About specific ads
  if (searchWord != "") {
    let temp = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchWord.toLowerCase())
    );

    arrSearch = [...temp];
  }

  return !ads.length ? (
    <div className=" vh-100 d-flex justify-content-center align-items-center">
      <CircularProgress />
    </div>
  ) : (
    <TableContainer component={Paper}>
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
      <div className="container">
        <input
          id="SearchByWordAllMovies"
          className={`${adsStyle.customInputSearch} mb-3`}
          placeholder="Search Advertisement ..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className="customFont" align="left">
              Title
            </StyledTableCell>
            <StyledTableCell className="customFont" align="center">
              Description
            </StyledTableCell>
            <StyledTableCell className="customFont" align="center">
              Update
            </StyledTableCell>
            <StyledTableCell className="customFont" align="center">
              Delete
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrSearch.length
            ? arrSearch.map((ad) => (
                <StyledTableRow key={ad._id}>
                  <StyledTableCell className="customFont" align="left">
                    {ad.title}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {ad.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => updateAd(ad)}
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#3550e8" }}
                      className="customFont"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => deleteAds(ad._id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : ads.map((ad) => (
                <StyledTableRow key={ad._id}>
                  <StyledTableCell className="customFont" align="left">
                    {ad.title}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {ad.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => updateAd(ad)}
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#3550e8" }}
                      className="customFont"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => deleteAds(ad._id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
