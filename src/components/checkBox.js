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
    const { classes } = this.props;

    console.log(this.props.openInfo);

    return (
      <div className={classes.checkList}>
        <List />
        <InfoDialog />
        <AddDialog />
        <Button color="primary" onClick={this.handleOpenAddItem}>
          Add new item
        </Button>
      </div>
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired,
  // checked: PropTypes.boolean,
  openInfo: PropTypes.bool,
  openAdd: PropTypes.bool,
  newItem: PropTypes.object,
  newItemInfo: PropTypes.string
};

const mapStateToProps = state => {
  return { openInfo: state.openInfo };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: () => dispatch({ type: "INFO" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Checkbox));
