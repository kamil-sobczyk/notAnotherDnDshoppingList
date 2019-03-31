import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteItem } from "../../actions/itemsModificationsActions";
import { toggleShowDeleteDialog } from "../../actions/togglingViewsActions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deleteItemsOnServer } from "../../functions/apiClient";

import Transition from './slideUpTransitionComponent';

class FinishDialog extends Component {
  handleDeleteItem = activeItem => {
    const { handleDeleteItem, handleToggleShowDeleteDialog } = this.props;

    handleDeleteItem(activeItem);
    deleteItemsOnServer(activeItem);

    handleToggleShowDeleteDialog({ list: "items", index: 0 });
  };

  render() {
    const {
      openDelete,
      handleToggleShowDeleteDialog,
      store,
      activeItem,
      list,
      index
    } = this.props;

    const active = store[list][index] ? store[list][index].name : "";
    return (
      <Dialog
        open={openDelete}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition} keepMounted
      >
        <DialogTitle id="alert-dialog-title">
          {"Deleting product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete {active} from your list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggleShowDeleteDialog.bind(this, {
              list: "items",
              index: 0
            })}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={this.handleDeleteItem.bind(this, activeItem)}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

FinishDialog.propTypes = {
  openDelete: PropTypes.bool,
  handleToggleShowDeleteDialog: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  activeItem: PropTypes.object,
  list: PropTypes.string,
  index: PropTypes.number
};

const mapStateToProps = state => {
  return {
    openDelete: state.openDelete,
    activeItem: state.activeItem,
    store: state,
    list: state.activeItem.list,
    index: state.activeItem.index
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleToggleShowDeleteDialog: activeItem =>
      dispatch(toggleShowDeleteDialog(activeItem)),
    handleDeleteItem: activeItem =>
      dispatch(deleteItem(activeItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishDialog);
