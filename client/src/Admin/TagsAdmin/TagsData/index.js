import React, { useContext, useState } from "react";
import "./style.css";
import adsStyle from "./styles.module.css";
import axios from "axios";
import { TagConetext } from "../../../contexts/tags";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

export default function TagsData({ updateTags }) {
  const [tags, setTags] = useContext(TagConetext).tags;
  const [searchWord, setSearchWord] = useState("");
  const token = localStorage.getItem("token");
  let arrSearch = [];
  const classes = useStyles();

  const deleteTag = (id) => {
    axios
      .delete(`https://reach-application-react.herokuapp.com/Tags/deleteTags/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log("response :", data);
        toast.info(" Tag deleted Success ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        axios
          .get("https://reach-application-react.herokuapp.com/Tags", {
            headers: {
              authorization: token,
            },
          })
          .then(({ data }) => {
            setTags(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //search About specific tag
  if (searchWord != "") {
    let temp = tags.filter((tag) =>
      tag.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    arrSearch = [...temp];
  }

  return (
    <TableContainer component={Paper} className="table_font">
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
          placeholder="Search tag ..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className="customFont" align="left">
              Name
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
            ? arrSearch.map((tag) => (
                <StyledTableRow key={tag._id}>
                  <StyledTableCell className="customFont" align="left">
                    {tag.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => updateTags(tag)}
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
                      onClick={() => deleteTag(tag._id)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : tags.map((tag) => (
                <StyledTableRow key={tag._id}>
                  <StyledTableCell className="customFont" align="left">
                    {tag.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => updateTags(tag)}
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
                      onClick={() => deleteTag(tag._id)}
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
