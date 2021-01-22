import React, { useContext ,useState} from "react";
import { TagConetext } from "../../contexts/tags";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./style";
import TagsData from "./TagsData";
import FormTag from "./Form";

const TagsAdmin = () => {

  const [tags, setTags] = useContext(TagConetext).tags;
  const [tag, setTag] = useState('')
  const classes = useStyles();

  const updateTags = (Tag) => {
    console.log(Tag);
    setTag(Tag);
  };

  return (
    <Container maxwidth="lg" className="pt-1">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={`${classes.heading} customFont`} variant="h3" align="center">
          Tags Panal
        </Typography>
      </AppBar>
      <Grow in className="pt-3">
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              {tags.length === 0 ? (
                <h2>There is no Tags !</h2>
              ) : (
                <TagsData updateTags={updateTags} />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTag tag={tag} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default TagsAdmin;
