import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import List from "./list";
import InfoDialog from "./infoDialog";
import AddDialog from "./addDialog";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Checkbox extends Component {
  render() {
    const { classes, handleOpenAdd } = this.props;

    return (
      <div className={classes.checkList}>
        <List />
        <InfoDialog />
        <AddDialog />
        <Button color="primary" onClick={handleOpenAdd}>
          Add new item
        </Button>
      </div>
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  openInfo: PropTypes.bool,
  openAdd: PropTypes.bool,
};

const mapStateToProps = state => {
  return { openInfo: state.openInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenAdd: () => dispatch({ type: "ADD_DIALOG" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Checkbox));
