import React from "react";
import _ from "lodash";
// import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import AlbumsList from "./AlbumsList";
import ArtistsList from "./ArtistsList";
import PlayList from "./PlayList";
import { Grid, Button } from "@material-ui/core";

import useStyles from "./styles";

const Result = props => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory,
  } = props;
  const { albums, artists, playlist } = result;
  const classes = useStyles();

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            session_expired: true,
          },
        }}
      />
    );
  }

  return (
    <Grid container justify="center">
      <Grid item container className={classes.result_btns} xs={8} sm={6}>
        {!_.isEmpty(albums.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "albums" ? "secondary" : "primary"}
            onClick={() => setCategory("albums")}
          >
            Albums
          </Button>
        )}
        {!_.isEmpty(artists.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "artists" ? "secondary" : "primary"}
            onClick={() => setCategory("artists")}
          >
            Artists
          </Button>
        )}
        {!_.isEmpty(playlist.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "playlist" ? "secondary" : "primary"}
            onClick={() => setCategory("playlist")}
          >
            PlayLists
          </Button>
        )}
      </Grid>
      <Grid item container xs={12}>
        {selectedCategory === "albums" ? (
          <Grid item>{albums && <AlbumsList albums={albums} />}</Grid>
        ) : selectedCategory === "artists" ? (
          <Grid item>{albums && <ArtistsList artists={artists} />}</Grid>
        ) : selectedCategory === "playlist" ? (
          <Grid item>{albums && <PlayList playlist={playlist} />}</Grid>
        ) : (
          <></>
        )}
      </Grid>
      <Grid item container justify="center" className={classes.result_more}>
        {!_.isEmpty(result[selectedCategory]) &&
          !_.isEmpty(result[selectedCategory].next) && (
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => loadMore(selectedCategory)}
            >
              Load More
            </Button>
          )}
      </Grid>
    </Grid>
  );
};

export default Result;
