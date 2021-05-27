import React, { useState } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import AlbumsList from "./AlbumsList";
import ArtistsList from "./ArtistsList";
import PlayList from "./PlayList";
import TracksList from "./TracksList";
import { Grid, Button, Typography } from "@material-ui/core";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";

import useStyles from "./styles";

const Result = props => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory,
    selectedSort,
    setSelectedSort,
  } = props;
  const { albums, artists, playlist, tracks } = result;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const setCategoryToSort = () => {
    switch (selectedCategory) {
      case "albums":
        return albums;
      case "artists":
        return artists;
      case "tracks":
        return tracks;
      case "playlist":
        return playlist;

      default:
    }
  };
  const sort = dir => {
    setIsLoading(true);
    setSelectedSort(dir);
    let category = setCategoryToSort();
    if (dir !== "") {
      category.items.sort((a, b) => {
        let itemA = a.name,
          itemB = b.name;
        if (itemA < itemB) {
          setIsLoading(false);
          return dir === "asc" ? -1 : 1;
        }
        if (itemA > itemB) {
          setIsLoading(false);
          return dir === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else {
      setIsLoading(false);
      return category.items.sort(() => Math.random() - 0.5);
    }
  };

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
    <Grid container justify="center" className={classes.result_container}>
      {(!_.isEmpty(albums.items) ||
        !_.isEmpty(artists.items) ||
        !_.isEmpty(playlist.items) ||
        !_.isEmpty(tracks.items)) && (
        <Grid
          item
          container
          className={classes.result_btns}
          xs={12}
          sm={10}
          md={8}
          lg={6}
          justify="space-evenly"
          spacing={1}
        >
          <Grid item xs={5} sm={3}>
            <Button
              variant="contained"
              color={selectedCategory === "albums" ? "secondary" : "primary"}
              onClick={() => setCategory("albums")}
              className={classes.result_btn}
              fullWidth
            >
              Albums
            </Button>
          </Grid>
          <Grid item xs={5} sm={3}>
            <Button
              variant="contained"
              color={selectedCategory === "artists" ? "secondary" : "primary"}
              onClick={() => setCategory("artists")}
              className={classes.result_btn}
              fullWidth
            >
              Artists
            </Button>
          </Grid>
          <Grid item xs={5} sm={3}>
            <Button
              variant="contained"
              color={selectedCategory === "playlist" ? "secondary" : "primary"}
              onClick={() => setCategory("playlist")}
              className={classes.result_btn}
              fullWidth
            >
              PlayLists
            </Button>
          </Grid>
          <Grid item xs={5} sm={3}>
            <Button
              variant="contained"
              color={selectedCategory === "tracks" ? "secondary" : "primary"}
              onClick={() => setCategory("tracks")}
              className={classes.result_btn}
              fullWidth
            >
              Tracks
            </Button>
          </Grid>

          <Grid
            item
            container
            justify="space-between"
            className={classes.result_btns}
            xs={10}
            md={8}
            spacing={1}
          >
            <Grid item xs={4} sm={3}>
              <Button
                variant="contained"
                color={selectedSort === "" ? "secondary" : "primary"}
                onClick={() => sort("")}
                className={classes.result_btn}
                title="Shuffle name"
                fullWidth
              >
                <BiShuffle fontSize="large" />
              </Button>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Button
                variant="contained"
                color={selectedSort === "asc" ? "secondary" : "primary"}
                onClick={() => sort("asc")}
                className={classes.result_btn}
                title="Sort by name ascending"
                fullWidth
              >
                <FaSortAlphaDown fontSize="large" />
              </Button>
            </Grid>
            <Grid item xs={4} sm={3}>
              <Button
                variant="contained"
                color={selectedSort === "des" ? "secondary" : "primary"}
                onClick={() => sort("des")}
                className={classes.result_btn}
                title="Sort by name descending"
                fullWidth
              >
                <FaSortAlphaDownAlt fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {isLoading ? (
        <Typography color="secondary">Loading...</Typography>
      ) : (
        <Grid item container xs={12} justify="center" spacing={2}>
          {selectedCategory === "albums" ? (
            <Grid item>{albums && <AlbumsList albums={albums} />}</Grid>
          ) : selectedCategory === "artists" ? (
            <Grid item>{artists && <ArtistsList artists={artists} />}</Grid>
          ) : selectedCategory === "playlist" ? (
            <Grid item>{playlist && <PlayList playlist={playlist} />}</Grid>
          ) : selectedCategory === "tracks" ? (
            <Grid item>{tracks && <TracksList tracks={tracks} />}</Grid>
          ) : (
            <></>
          )}
        </Grid>
      )}
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
