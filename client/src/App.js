import React, { Component } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import withRoot from "./components/withRoot";
import NavBar from "./components/nav";
import CheckBox from "./components/checkBox";

const styles = theme => ({
  root: {
    textAlign: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <Typography variant="h4" gutterBottom>
          Check items that you need to buy
        </Typography>
        <div className={classes.content}>
          <CheckBox />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
