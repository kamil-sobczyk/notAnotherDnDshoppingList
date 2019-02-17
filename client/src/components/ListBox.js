import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import ListsContainer from "./listsContainer";
import AddDialog from "./dialogs/addDialog";
import EditDialog from "./dialogs/editDialog";
import DeleteDialog from "./dialogs/deleteDialog";

const styles = theme => ({
  lists: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class ListBox extends Component {
  render() {
    const { classes, handleOpenAdd } = this.props;

    return (
      <div className={classes.lists}>
        <ListsContainer />
        <AddDialog />
        <EditDialog />
        <DeleteDialog />
        <Button color="primary" onClick={handleOpenAdd}>
          Add new item
        </Button>
      </div>
    );
  }
}

ListBox.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOpenAdd: PropTypes.func,
  openInfo: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenAdd: () => dispatch({ type: "SHOW_ADD_DIALOG" })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(ListBox));
