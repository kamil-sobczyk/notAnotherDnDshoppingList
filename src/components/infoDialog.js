import React, { Component } from "react";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

class InfoDialog extends Component {
  render() {
    const { openInfo, handleOpenInfo, list, activeInfo } = this.props;
    return (
      <Dialog open={openInfo} onClose={handleOpenInfo}>
        <DialogTitle>More info</DialogTitle>
        <DialogContent>
          <DialogContentText>{list[activeInfo].info}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleOpenInfo}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    openInfo: state.openInfo,
    list: state.list,
    activeInfo: state.activeInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: () => dispatch({ type: "INFO_DIALOG" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoDialog);
