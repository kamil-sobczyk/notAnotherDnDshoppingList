import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

class InfoDialog extends Component {
    render() {
        return (<Dialog open={false} onClose={null}>
            <DialogTitle>More info</DialogTitle>
            <DialogContent>
              <DialogContentText>Buy in Lidl</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handle}>
                Close
              </Button>
            </DialogActions>
          </Dialog>)
    }
}

const mapStateToProps = state => {
    return { openInfo: state.openInfo };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      handleOpenInfo: () => dispatch({ type: "INFO" })
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(InfoDialog);
  