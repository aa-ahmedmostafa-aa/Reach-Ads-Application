import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "20px 20px",
  },
  mTopTypography: {
    marginTop: 10,
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop: 20,
    backgroundColor:"#151827"
  },
  IconimageCamera: {
    cursor: "pointer",
    fontSize: "40px",
  },
}));
