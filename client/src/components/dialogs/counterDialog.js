import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deleteItem, toggleShowDeleteDialog } from "../../actions";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class CounterDialog extends React.Component {
  state = {
    openCounter: false
  };

  handleCount = () => {
    this.props.handleOpenFinish();
    this.setState({
      openCounter: true
    });
  };

  render() {
    const { openFinish, handleOpenFinish } = this.props;

    return (
      <Dialog
        open={openFinish}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
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
          <Button color="primary" onClick={handleOpenFinish}>
            No
          </Button>
          <Button color="primary" autoFocus onClick={this.handleOpenCounter}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

CounterDialog.propTypes = {
  openDelete: PropTypes.bool,
  handleToggleShowDeleteDialog: PropTypes.func,
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
    handleToggleShowDeleteDialog: activeItem =>
      dispatch(toggleShowDeleteDialog(activeItem)),
    handleDeleteItem: activeItem =>
      dispatch(deleteItem(activeItem))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterDialog);
