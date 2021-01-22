import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor:"#e2e2e2"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0 5px 0",
   
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor:"#151827"
  },
  IconimageCamera: {
    cursor: "pointer",
    fontSize: "40px",
  },
}));
