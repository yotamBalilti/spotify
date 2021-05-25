import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  result_btns: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "8px",
    marginBottom: "24px",
  },
  result_more: {
    margin: "12px",
  },
  result_card: {
    height: "400px",
    position: "relative",
  },
  card_content: {
    paddingTop: "30px",
  },
  media: {
    height: "60%",
    objectFit: "cover",
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
}));
