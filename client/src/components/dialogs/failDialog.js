import React from "react";

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

const FailDialog = props => {
  const { open, onClose } = props;
  console.log("fail")
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      keepMounted
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
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FailDialog;
