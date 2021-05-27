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

const ArtistsList = ({ artists }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.result_container} justify="center">
      {Object.keys(artists).length > 0 && (
        <Grid item container spacing={2} justify="center">
          {artists.items.map((artist, index) => {
            return (
              <Grid item xs={10} sm={5} md={3} key={index}>
                <Card className={classes.result_card}>
                  <CardMedia
                    className={classes.media}
                    image={artist.images[0] ? artist.images[0].url : altImage}
                    title={artist.name}
                  />
                  <CardContent className={classes.card_content}>
                    <Typography variant="button" component="h4">
                      {artist.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {artist.genres.map(genre => genre).join(", ")}
                    </Typography>
                    <Link
                      href={artist.external_urls.spotify}
                      className={classes.play}
                      title="Click to Play"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IoPlay />
                    </Link>
                    <Typography variant="caption" component="span">
                      Followers: {artist.followers.total}
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

export default ArtistsList;
