import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import AlbumsList from "./AlbumsList";
import ArtistsList from "./ArtistsList";
import PlayList from "./PlayList";
import TracksList from "./TracksList";
import { Grid, Button } from "@material-ui/core";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

import useStyles from "./styles";

const Result = props => {
  const {
    isValidSession,
    loadMore,
    result,
    setCategory,
    selectedCategory,
  } = props;
  const { albums, artists, playlist, tracks } = result;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [isLoading]);

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
      case "plist":
        return playlist;
      default:
    }
  };
  const sort = dir => {
    setIsLoading(true);
    let category = setCategoryToSort();
    category.items.sort(function (a, b) {
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
    <Grid container justify="center">
      <Grid
        item
        container
        className={classes.result_btns}
        xs={12}
        sm={10}
        md={8}
        lg={6}
      >
        {!_.isEmpty(albums.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "albums" ? "secondary" : "primary"}
            onClick={() => setCategory("albums")}
            className={classes.result_btn}
          >
            Albums
          </Button>
        )}
        {!_.isEmpty(artists.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "artists" ? "secondary" : "primary"}
            onClick={() => setCategory("artists")}
            className={classes.result_btn}
          >
            Artists
          </Button>
        )}
        {!_.isEmpty(playlist.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "playlist" ? "secondary" : "primary"}
            onClick={() => setCategory("playlist")}
            className={classes.result_btn}
          >
            PlayLists
          </Button>
        )}
        {!_.isEmpty(tracks.items) && (
          <Button
            variant="contained"
            color={selectedCategory === "tracks" ? "secondary" : "primary"}
            onClick={() => setCategory("tracks")}
            className={classes.result_btn}
          >
            Tracks
          </Button>
        )}
      </Grid>
      {(!_.isEmpty(albums.items) ||
        !_.isEmpty(artists.items) ||
        !_.isEmpty(playlist.items) ||
        !_.isEmpty(tracks.items)) && (
        <Grid item container justify="center" className={classes.result_btns}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => sort("asc")}
            className={classes.result_btn}
            title="Sort by name ascending"
          >
            <FaSortAlphaDown fontSize="large" />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => sort("des")}
            className={classes.result_btn}
            title="Sort by name descending"
          >
            <FaSortAlphaDownAlt fontSize="large" />
          </Button>
        </Grid>
      )}
      <Grid item container xs={12}>
        {selectedCategory === "albums" ? (
          <Grid item>{albums && <AlbumsList albums={albums} />}</Grid>
        ) : selectedCategory === "artists" ? (
          <Grid item>{albums && <ArtistsList artists={artists} />}</Grid>
        ) : selectedCategory === "playlist" ? (
          <Grid item>{albums && <PlayList playlist={playlist} />}</Grid>
        ) : selectedCategory === "tracks" ? (
          <Grid item>{tracks && <TracksList tracks={tracks} />}</Grid>
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
