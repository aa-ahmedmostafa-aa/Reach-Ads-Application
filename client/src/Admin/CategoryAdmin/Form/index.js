import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CategoryConetext } from "../../../contexts/category";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import useStyles from "./style";
export default function FormCategory({ category }) {
  const classes = useStyles();
  const [categories, setCategories] = useContext(CategoryConetext).categories;
  const [categoryExist, setCategoryExist] = useState(true);
  const [categoryAddFlag, setCategoryAddFlag] = useState(true);
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (category != "") {
      setCategoryData({
        name: category.name,
        description: category.description,
      });
      setCategoryAddFlag(false);
    }
  }, [category]);
  useEffect(() => {
    categories.map((category) => {
      if (category.name == categoryData.name) {
        setCategoryExist(false);
      }
    });
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    const url = "https://reach-application-react.herokuapp.com/category/addCategory";
    if (categoryData.name != "" && categoryData.description != "") {
      console.log("categoryExist :", categoryExist);
      if (!categoryExist) {
        setCategoryExist(true);
        clear();
        toast.warn(" Sorry Category already exist ", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      }

      axios
        .post(url, categoryData, { headers: { authorization: token } })
        .then(({ data }) => {
          toast.info("  Category added successfully ", {
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
    }
  };
  const handelUpdate = (e) => {
    e.preventDefault();
    const url = `https://reach-application-react.herokuapp.com/category/Category/Update/${category._id}`;
    if (categoryData.name != "" && categoryData.description != "") {
      axios
        .put(url, categoryData, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          toast.info("  Category updated successfully ", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          clear();
          setCategoryAddFlag(true);
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
    }
  };
  const clear = () => {
    setCategoryData({
      name: "",
      description: "",
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
        className={`${classes.root} ${classes.form} `}
        onSubmit={categoryAddFlag ? handelSubmit : handelUpdate}
      >
        <Typography variant="h6" className="customFont">
          Creating a Category
        </Typography>
        <TextField
          className="customFont"
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          value={categoryData.name}
          onChange={(e) =>
            setCategoryData({ ...categoryData, name: e.target.value })
          }
        />
        <TextField
          className="customFont"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={categoryData.description}
          onChange={(e) =>
            setCategoryData({ ...categoryData, description: e.target.value })
          }
        />
        <Button
          className={`${classes.buttonSubmit} customFont`}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {categoryAddFlag ? "Add" : "update"}
        </Button>
        <Button
          className="customFont"
          style={{ backgroundColor: "#3550e8" }}
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
