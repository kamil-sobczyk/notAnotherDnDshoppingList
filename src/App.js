import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "./components/withRoot";
import NavBar from "./components/nav";
import CheckBox from "./components/checkBox";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
});

class Index extends React.Component {
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

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Index)));
