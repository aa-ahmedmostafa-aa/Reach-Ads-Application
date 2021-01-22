import React, { useContext, useState } from "react";
import "./style.css";
import categoryStyle from "./styles.module.css";
import axios from "axios";
import { CategoryConetext } from "../../../contexts/category";
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

export default function CategoriesData({ updateCategory }) {
  const [categories, setCategories] = useContext(CategoryConetext).categories;
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState("");
  let arrSearch = [];
  const token = localStorage.getItem("token");
  const deleteCategory = (id) => {
    
    axios
      .delete(`https://reach-application-react.herokuapp.com/category/deleteCategory/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        toast.info("  Category deleted successfully ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Search about Ads
  if (searchWord != "") {
    let temp = categories.filter((category) =>
      category.name.toLowerCase().includes(searchWord.toLowerCase())
    );

    arrSearch = [...temp];
  }

  return (
    <TableContainer component={Paper} className="customFont">
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
          className={`${categoryStyle.customInputSearch} mb-3`}
          placeholder="Search About Cateogry ..."
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
        <TableBody className="customFont">
          {arrSearch.length
            ? arrSearch.map((category) => (
                <StyledTableRow key={category._id}>
                  <StyledTableCell className="customFont" align="left">
                    {category.name}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {category.description}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => updateCategory(category)}
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
                      onClick={() => deleteCategory(category._id)}
                      fullWidth
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            : categories.map((category) => (
                <StyledTableRow key={category._id}>
                  <StyledTableCell className="customFont" align="left">
                    {category.name}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {category.description}
                  </StyledTableCell>
                  <StyledTableCell className="customFont" align="center">
                    {" "}
                    <Button
                      style={{ backgroundColor: "#151827" }}
                      className="customFont"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => updateCategory(category)}
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
                      onClick={() => deleteCategory(category._id)}
                      fullWidth
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
