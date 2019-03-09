import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FailDialog extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Unable to add new product to the list!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This product is on your list already.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default FailDialog;
