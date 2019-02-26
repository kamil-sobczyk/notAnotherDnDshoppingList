import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import withRoot from "./components/withRoot";
import NavBar from "./components/nav";
import ListBox from "./components/listBox";

import ShoppingDialog from './components/dialogs/shoppingDialog';

const styles = theme => ({
  root: {
    textAlign: "center",
    backgroundColor: theme.palette.background.paper
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <ListBox />
        <ShoppingDialog/>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
