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
// import music from "../images/music.jpeg";
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
                  <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  >
                    {!_.isEmpty(item.images) ? (
                      <CardMedia
                        className={classes.media}
                        image={item.images[0].url}
                        title={item.name}
                      />
                    ) : (
                      // <img src={music} alt="" />
                      <p>IMAGE</p>
                    )}
                  </a>
                  <CardContent className={classes.card_content}>
                    <Typography variant="button" component="h4">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {/* {album.artists.map(artist => artist.name).join(", ")} */}
                      By {item.owner.display_name}
                    </Typography>
                    <Link
                      href={item.external_urls.spotify}
                      className={classes.play}
                      title="Click to Play"
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