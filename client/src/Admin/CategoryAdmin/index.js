import React, { useContext ,useState} from "react";
import { CategoryConetext } from "../../contexts/category";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./style";
import FormCategory from "./Form";
import CategoriesData from "./CategoriesData";

const CategoryAdmin = () => {
  const [categories, setCategories] = useContext(CategoryConetext).categories;
  const [category, setCategory] = useState('')
  const classes = useStyles();

  const updateCategory = (category) => {
    console.log(category);
    setCategory(category);
  };

  return (
    <Container maxwidth="lg" className="pt-1">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={`${classes.heading} customFont`} variant="h3" align="center">
          Category Panal
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
              {categories.length === 0 ? (
                <h2>There is no category !</h2>
              ) : (
                <CategoriesData updateCategory={updateCategory} />
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormCategory category={category} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default CategoryAdmin;
