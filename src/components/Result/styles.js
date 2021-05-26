import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  result_btns: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "24px",
  },
  result_container: {},
  result_more: {
    margin: "12px",
  },
  result_card: {
    height: "300px",
    position: "relative",
  },
  card_content: {
    paddingTop: "24px",
  },
  media: {
    height: "60%",
    objectFit: "cover",
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
