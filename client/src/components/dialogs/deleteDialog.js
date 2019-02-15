import React from "react";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteDialog extends React.Component {
  handleDeleteItem = index => {
    this.props.handleOpenDelete();
    this.props.handleDeleteItem(this.props.activeInfo);

    fetch("/store/list/", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify( { index: index } )
      })
        .then(response => {
          return response.json();
        })
        .then(state => {
          return state;
        })
        .catch(error => console.log("Ooops", error));
  };
  handleOpenDelete = i => {
      this.props.handleOpenDelete(i);
  }
  handleClese
  render() {
    const { openDelete, handleOpenDelete, list, activeInfo } = this.props;
    const active = !list[activeInfo] ? "" : list[activeInfo].name;

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
          <Button onClick={handleOpenDelete.bind(this, null)} color="primary">
            No
          </Button>
          <Button onClick={this.handleDeleteItem.bind(this, activeInfo)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {};

const mapStateToProps = state => {
  return { openDelete: state.openDelete, activeInfo: state.activeInfo, list: state.list };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenDelete: index =>
      dispatch({ type: "SHOW_DELETE_DIALOG", index: index }),
    handleDeleteItem: index => dispatch({ type: "DELETE_ITEM", index: index })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDialog);
