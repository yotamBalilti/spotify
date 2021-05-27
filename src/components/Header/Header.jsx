import React from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.header}
    >
      <Grid item>
        <Typography component="h1" variant="h1" color="primary">
          SpotiSearch
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
