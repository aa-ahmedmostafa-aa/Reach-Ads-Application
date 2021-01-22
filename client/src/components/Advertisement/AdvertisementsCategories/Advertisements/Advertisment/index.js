import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";

import moment from "moment";

import useStyles from "./style";
import adsStyle from './custom.module.css';

const Advertisement = ({ advertisement }) => {
  const classes = useStyles();

  return (
    <Card className={`${classes.card} customFont`}>
      <CardMedia
        className={classes.media}
        image={
          advertisement.photo ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={advertisement.title}
      />
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{advertisement.creator}</Typography> */}
      </div>
      {/* <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
      </div> */}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {advertisement.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <div className="row justify-content-between bg-transparent  rounded">
        <Typography
          className={`${classes.title} customFont`}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {advertisement.title}
        </Typography>
        <div className="customFont ">
          <Typography
            variant="body2"
            color="black"
            component="p"
            style={{ paddingRight: "1rem", textAlign: "right" }}
            className="customFont"
          >
            Start:{" "}
            {moment(advertisement.startDate).calendar()}
          </Typography>
          <Typography
            variant="body2"
            color="black"
            component="p"
            style={{ paddingRight: "1rem", textAlign: "right" }}
            className="customFont"
          >
            End :{" "}
            {moment(advertisement.endDate).calendar()}
          </Typography>
        </div>
      </div>

      <CardContent>
        <div class="row justify-content-between">
          <Typography variant="body2" color="textSecondary" component="p">
            {advertisement.description}
          </Typography>
          <Typography
            variant="body2"
            color="black"
            component="p"
            className={adsStyle.customType}
          >
            {advertisement.type}
          </Typography>
        </div>
      </CardContent>
      {/* <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions> */}
    </Card>
  );
};

export default Advertisement;
