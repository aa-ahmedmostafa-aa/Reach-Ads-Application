import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { TagConetext } from "../../../contexts/tags";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import useStyles from "./style";
export default function FormTag({ tag }) {
  const classes = useStyles();
  const [tags, setTags] = useContext(TagConetext).tags;
  const [tagExist, setTagExist] = useState(true);
  const [tagAddFlag, setTagAddFlag] = useState(true);
  const token = localStorage.getItem("token");
  const [tagData, setTagData] = useState({
    name: "",
  });
  useEffect(() => {
    if (tag != "") {
      setTagData({
        name: tag.name,
      });
      setTagAddFlag(false);
    }
  }, [tag]);

  useEffect(() => {
    tags.map((tag) => {
      if (tag.name == tagData.name) {
        setTagExist(false);
      }
    });
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    const url = "https://reach-application-react.herokuapp.com/Tags/addTags";
    if (tagData.name != "") {
      if (!tagExist) {
        setTagExist(true);
        clear();
        toast.warn(" Sorry Tag already exist ", {
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
        .post(url, tagData, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          toast.info(" Tag added Success ", {
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
            .get("https://reach-application-react.herokuapp.com/Tags", {
              headers: {
                authorization: token,
              },
            })
            .then(({ data }) => {
              setTags(data);
              $("html,body").animate(
                { scrollTop: document.body.scrollHeight },
                1000
              );
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
    const url = `https://reach-application-react.herokuapp.com/Tags/UpdateTag/${tag._id}`;
    if (tagData.name != "") {
      setTagExist(true);
      axios
        .put(url, tagData, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          toast.info(" Tag updated Success ", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          clear();
          setTagAddFlag(true);
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const clear = () => {
    setTagData({
      name: "",
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
        onSubmit={tagAddFlag ? handelSubmit : handelUpdate}
      >
        <Typography variant="h6" className="customFont">
          Creating a Tag
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Name"
          fullWidth
          value={tagData.name}
          onChange={(e) => setTagData({ ...tagData, name: e.target.value })}
        />

        <Button
          className={`${classes.buttonSubmit} customFont`}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {tagAddFlag ? "Add" : "update"}
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
