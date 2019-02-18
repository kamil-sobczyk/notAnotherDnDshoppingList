import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deleteItems } from "../data/fetchFunctions";

class DeleteDialog extends React.Component {
  handleDeleteItem = activeItem => {
    const { handleDeleteItem, handleOpenDelete } = this.props;

    handleDeleteItem(activeItem);
    deleteItems(null, activeItem);

    handleOpenDelete({ list: "items", index: 0 });
  };
  handleOpenDelete = i => {
    this.props.handleOpenDelete(i);
  };
  handleClese;
  render() {
    const { openDelete, handleOpenDelete, store, activeItem } = this.props;

    const active = store[activeItem.list][activeItem.index]
      ? store[activeItem.list][activeItem.index].name
      : "";

    console.log("store", store);

    console.log("activeItem", activeItem);
    console.log("active", active);

    return (
      <Dialog
        open={openDelete}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You are trying to delete item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete {active} from your list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOpenDelete.bind(this, { list: "items", index: 0 })}
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

DeleteDialog.propTypes = {
  openDelete: PropTypes.bool,
  handleOpenDelete: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  list: PropTypes.array,
  activeItem: PropTypes.object
};

const mapStateToProps = state => {
  return {
    openDelete: state.openDelete,
    activeItem: state.activeItem,
    store: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenDelete: activeItem =>
      dispatch({
        type: "SHOW_DELETE_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      }),
    handleDeleteItem: activeItem =>
      dispatch({
        type: "DELETE_ITEM",
        list: activeItem.list,
        index: activeItem.index
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDialog);
