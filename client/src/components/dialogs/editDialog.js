import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

import { editItem } from "../../functions/apiClient";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class EditDialog extends Component {
  state = {
    name: "",
    info: "",
    id: new Date()
  };

  handleCloseEdit = activeItem => {
    const { handleEditItem, handleToggleOpenEditDialog, store } = this.props;

    const newState = this.state;
    newState.name === ""
      ? (newState.name = store[activeItem.list][activeItem.index].name)
      : (newState.name = this.state.name);

    editItem(newState, activeItem);
    handleEditItem(newState, activeItem);
    handleToggleOpenEditDialog(activeItem);
    this.setState({ name: "", info: "" });
  };

  changeNewItem = e => {
    const { store, activeItem } = this.props;

    this.setState({
      name: e ? e.target.value : store[activeItem.list][activeItem.index].name
    });
  };

  changeNewItemInfo = e => {
    const { store, activeItem } = this.props;
    this.setState({
      info: e ? e.target.value : store[activeItem.list][activeItem.index].info
    });
  };

  render() {
    const {
      classes,
      openEdit,
      activeItem,
      activeItem: { list, index },
      handleToggleOpenEditDialog,
      store
    } = this.props;

    return (
      <Dialog open={openEdit} TransitionComponent={Transition}>
        <DialogTitle>Edit product</DialogTitle>
        <TextField
          required
          id="outlined-required"
          label="Type new name"
          defaultValue={!store[list][index] ? " " : store[list][index].name}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id="outlined"
          label="Type new additional info"
          defaultValue={!store[list][index] ? " " : store[list][index].info}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItemInfo}
        />
        <DialogActions>
          <Button
            color="primary"
            onClick={handleToggleOpenEditDialog.bind(this, activeItem)}
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
  handleToggleOpenEditDialog: PropTypes.func,
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
    handleToggleOpenEditDialog: activeItem =>
      dispatch({
        type: "TOGGLE_SHOW_EDIT_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      }),
    handleEditItem: (newItem, activeItem) =>
      dispatch({
        type: "EDIT_ITEM",
        newItem: newItem,
        index: activeItem.index,
        list: activeItem.list
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDialog));
