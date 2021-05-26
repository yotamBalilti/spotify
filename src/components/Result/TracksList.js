import React from "react";
import _ from "lodash";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Link,
  CardActions,
} from "@material-ui/core";
import altImage from "../../images/altImage.jpg";
import useStyles from "./styles";
import { IoPlay } from "react-icons/io5";

const TracksList = ({ tracks }) => {
  const classes = useStyles();

  const calcSongDuration = millis => {
    const dateObject = new Date(millis);
    let minutes = dateObject.toLocaleString("en-US", { minute: "numeric" });
    let seconds = dateObject.toLocaleString("en-US", { second: "numeric" });
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  return (
    <Grid container className={classes.result_container} justify="center">
      {Object.keys(tracks).length > 0 && (
        <Grid item container spacing={2} justify="center">
          {tracks.items.map((track, index) => {
            return (
              <Grid item xs={10} sm={5} md={3} key={index}>
                <Card className={classes.result_card}>
                  <CardMedia
                    className={classes.media}
                    image={track.album.images[0].url || altImage}
                    title={track.name}
                    onClick={() => console.log(track)}
                  />
                  <CardContent className={classes.card_content}>
                    <Typography
                      variant="button"
                      component="h4"
                      className={classes.track_duration}
                    >
                      {calcSongDuration(track.duration_ms)}
                    </Typography>
                    <Typography variant="button" component="h4">
                      {track.name} {"  "}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {track.artists.map(artist => artist.name).join(", ")}
                    </Typography>
                    <Link
                      href={track.external_urls.spotify}
                      className={classes.play}
                      title="Click to Play"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IoPlay />
                    </Link>
                    <Typography variant="caption" component="span">
                      Album: {track.album.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default TracksList;
