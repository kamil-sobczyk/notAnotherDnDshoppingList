import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import { editItem } from "../functions/fetchFunctions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditDialog extends Component {
  state = {
    name: "",
    info: ""
  };
  
  handleCloseEdit = activeItem => {
    const { handleEditItem, handleOpenEdit } = this.props;

    editItem(this.state, activeItem)
    handleEditItem(this.state, activeItem);
    handleOpenEdit(activeItem);
    this.setState({ name: "", info: "" });
  };

  changeNewItem = e => {
    this.setState({ name: e.target.value });
  };

  changeNewItemInfo = e => {
    this.setState({ info: e.target.value });
  };

  render() {
    const { classes, openEdit, activeItem, handleOpenEdit, store } = this.props;

    return (
      <Dialog open={openEdit} >
        <DialogTitle>Edit product</DialogTitle>
        <TextField
          required
          id="outlined-required"
          label="Edit name"
          placeholder={!store[activeItem.list][activeItem.index] ? " " : store[activeItem.list][activeItem.index].name}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id="outlined"
          label="Edit info"
          placeholder={!store[activeItem.list][activeItem.index] ? " " : store[activeItem.list][activeItem.index].info}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItemInfo}
        />
        <DialogActions>
          <Button
            color="primary"
            onClick={handleOpenEdit.bind(this, {
              list: "items",
              index: 0
            })}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={this.handleCloseEdit.bind(this, activeItem)}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOpenEdit: PropTypes.func,
  openEdit: PropTypes.bool,
  handleEditItem: PropTypes.func,
  activeItem: PropTypes.object,
  store: PropTypes.object
};

const mapStateToProps = state => {
  return {
    store: state,
    openEdit: state.openEdit,
    activeItem: state.activeItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenEdit: activeItem =>
      dispatch({
        type: "SHOW_EDIT_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      }),
    handleEditItem: (newItem, activeItem) =>
      dispatch({ type: "EDIT_ITEM", newItem: newItem, index: activeItem.index, list: activeItem.list })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDialog));
