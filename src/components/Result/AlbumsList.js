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

const AlbumsList = ({ albums }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.result_container} justify="center">
      {Object.keys(albums).length > 0 && (
        <Grid item container spacing={2} justify="center">
          {albums.items.map((album, index) => {
            return (
              <Grid item xs={10} sm={5} md={3} key={index}>
                <Card className={classes.result_card}>
                  <a
                    target="_blank"
                    href={album.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(album.images) ? (
                      <CardMedia
                        className={classes.media}
                        image={album.images[0].url}
                        title={album.name}
                      />
                    ) : (
                      <img src={altImage} alt="" />
                      // <p>IMAGE</p>
                    )}
                  </a>
                  <CardContent className={classes.card_content}>
                    <Typography variant="button" component="h4">
                      {album.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {album.artists.map(artist => artist.name).join(", ")}
                    </Typography>
                    <Link
                      href={album.external_urls.spotify}
                      className={classes.play}
                      title="Click to Play"
                    >
                      <IoPlay />
                    </Link>
                    <Typography variant="caption" component="span">
                      Number of tracks: {album.total_tracks}
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

export default AlbumsList;
