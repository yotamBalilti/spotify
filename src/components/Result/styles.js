import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  result_btns: {
    display: "flex",
    justifyContent: "center",
    padding: "12px",
  },
  result_btn: {},
  result_more: {
    margin: "12px",
  },
  result_card: {
    height: "300px",
    minWidth: "200px",
    position: "relative",
    // [theme.breakpoints.down("md")]: {
    //   height: "300px",
    // },
  },
  card_content: {
    paddingTop: "24px",
    "& p": {
      display: "-webkit-box",
      WebkitLineClamp: "2",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    "& h4": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  media: {
    height: "60%",
    backgroundSize: "cover",
    position: "relative",
  },
  play: {
    height: "50px",
    width: "50px",
    backgroundColor: "#333",
    fontSize: "28px",
    padding: "8px",
    borderRadius: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    border: "4px solid #fff",
  },
  track_duration: {
    position: "absolute",
    top: "60%",
    right: "12px",
    padding: "4px 0",
  },
}));
