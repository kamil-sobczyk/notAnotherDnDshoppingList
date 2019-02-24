import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deleteItems } from "../functions/apiClient";

class FinishDialog extends React.Component {
    state = {
        openCounter: false
    }
  
    handleOpenCounter = () => {
        this.props.handleOpenFinish();
        this.setState({
            openCounter: true
        })
    }


  render() {
    const { openFinish, openCounter, handleOpenFinish } = this.props;

    return (
      <Dialog
        open={openFinish}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You are trying to finish your shopping"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to clear selected items and finnish your shopping?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleOpenFinish}
          >
            No
          </Button>
          <Button
            color="primary"
            autoFocus
            onClick={this.handleOpenCounter}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

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
)(FinishDialog);
