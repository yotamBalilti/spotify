import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  search: {
    color: "#34eb5a",
    height: "15vh",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "48px",
    },
  },
  search_form: {
    width: "100%",
  },
  search_form_title: {
    paddingBottom: "24px",
  },
  search_bar: {},
  search_btn: {},

  input: {
    color: "#333",
    backgroundColor: "#fff",
  },
}));
