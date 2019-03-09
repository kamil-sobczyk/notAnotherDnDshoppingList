import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CounterDialog extends React.Component {
    state = {
        openCounter: false
    }
  
    handleCount = () => {
        this.props.handleOpenFinish();
        this.setState({
            openCounter: true
        })
    }


  render() {
    const { openFinish, handleOpenFinish } = this.props;

    return (
      <Dialog
        open={openFinish}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Type how much You spent on shopping"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure wan
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

CounterDialog.propTypes = {
  openDelete: PropTypes.bool,
  handleToggleOpenDeleteDialog: PropTypes.func,
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
    handleToggleOpenDeleteDialog: activeItem =>
      dispatch({
        type: "TOGGLE_SHOW_DELETE_DIALOG",
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
)(CounterDialog);
