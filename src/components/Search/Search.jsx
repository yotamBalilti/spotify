import React, { useState } from "react";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";

const Search = props => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = event => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleSearch = event => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      setErrorMsg("");
      props.handleSearch(searchTerm);
    } else {
      setErrorMsg("Please enter a search term.");
    }
  };

  return (
    <Grid container justify="center" className={classes.search}>
      <Grid item container xs={12} justify="center" alignItems="center">
        <form onSubmit={handleSearch} className={classes.search_form}>
          <Grid item className={classes.search_form_title}>
            <Typography
              component="h2"
              variant="h4"
              align="center"
              color="primary"
            >
              What are you looking for?
            </Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center" spacing={2}>
            <Grid item xs={8} md={6} className={classes.search_bar}>
              <TextField
                className={classes.TextField}
                type="search"
                name="searchTerm"
                value={searchTerm}
                placeholder="Search for your favorite song, artist or album"
                onChange={handleInputChange}
                autoComplete="off"
                fullWidth
                variant="outlined"
                margin="dense"
                InputProps={{
                  className: classes.input,
                }}
              />
              {errorMsg && (
                <Typography component="h3" variant="body2" color="error">
                  {errorMsg}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.search_btn}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Search;
