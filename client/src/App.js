import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import withRoot from "./components/withRoot";
import NavBar from "./components/nav";
import ListBox from "./components/ListBox";

const styles = theme => ({
  root: {
    textAlign: "center"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <ListBox />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
