import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "70px 0 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  heading: {
    color: "light",
  },
  image: {
    marginLeft: "15px",
    borderRadius: "5px",
  },
}));
