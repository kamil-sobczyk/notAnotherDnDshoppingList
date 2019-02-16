import React, { Component } from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import withRoot from "./components/withRoot";
import NavBar from "./components/nav";
import ListBox from "./components/ListBox";

import DND from './components/DND.js';
import List from './components/list';

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
        <div className={classes.content}>
          <ListBox />
        </div>
        {/* <List/> */}
    
        <DND />
  
       
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));
