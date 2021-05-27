import React from "react";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Link,
} from "@material-ui/core";
import altImage from "../../images/altImage.jpg";
import useStyles from "./styles";
import { IoPlay } from "react-icons/io5";

const PlayList = ({ playlist }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.result_container} justify="center">
      {Object.keys(playlist).length > 0 && (
        <Grid item container spacing={2} justify="center">
          {playlist.items.map((item, index) => {
            return (
              <Grid item xs={10} sm={5} md={3} key={index}>
                <Card className={classes.result_card}>
                  <CardMedia
                    className={classes.media}
                    image={item.images[0] ? item.images[0].url : altImage}
                    title={item.name}
                  />
                  <CardContent className={classes.card_content}>
                    <Typography variant="button" component="h4">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      By {item.owner.display_name}
                    </Typography>
                    <Link
                      href={item.external_urls.spotify}
                      className={classes.play}
                      title="Click to Play"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IoPlay />
                    </Link>
                    <Typography variant="caption" component="span">
                      {item.tracks.total} tracks on this playlist
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

export default PlayList;
