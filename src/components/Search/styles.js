import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  search: {
    color: "#34eb5a",
    height: "15vh",
    // border: "1px solid blue",
  },
  search_form: {
    width: "100%",
    // border: "1px solid salmon",
  },
  search_form_title: {
    paddingBottom: "24px",
    [theme.breakpoints.down("xs")]: {
      "& h2": {
        fontSize: "20px",
      },
    },
  },
  search_bar: {},
  TextField: {
    borderColor: "red",
  },
}));
