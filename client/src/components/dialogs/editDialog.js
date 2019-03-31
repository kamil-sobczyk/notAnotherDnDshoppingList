import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { editItem } from "../../actions/itemsModificationsActions";
import { toggleShowEditDialog } from "../../actions/togglingViewsActions";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import { editItemOnServer } from "../../functions/apiClient";

import Transition from './slideUpTransitionComponent';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditDialog extends Component {
  state = {
    name: "",
    info: "",
    id: new Date()
  };

  handleCloseEdit = activeItem => {
    const { handleEditItem, handleToggleShowEditDialog, store } = this.props;

    const newState = this.state;
    newState.name === ""
      ? (newState.name = store[activeItem.list][activeItem.index].name)
      : (newState.name = this.state.name);

    editItemOnServer(newState, activeItem);
    handleEditItem(newState, activeItem);
    handleToggleShowEditDialog(activeItem);
    this.setState({ name: "", info: "", id: new Date() });
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
      handleToggleShowEditDialog,
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
            onClick={handleToggleShowEditDialog.bind(this, activeItem)}
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
  handleToggleShowEditDialog: PropTypes.func,
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
    handleToggleShowEditDialog: activeItem =>
      dispatch(toggleShowEditDialog(activeItem)),
    handleEditItem: (newItem, activeItem) =>
      dispatch(editItem(newItem, activeItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDialog));
