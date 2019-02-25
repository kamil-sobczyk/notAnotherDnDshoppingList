import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import Table from "../table/table";

class ShoppingDialog extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClick}>
          Show previous shopping
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClick}
          aria-labelledby="shopping-you-made"
        >
          <DialogTitle>{"Shopping you made"}</DialogTitle>
          <DialogContent>
            <Table />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

ShoppingDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ShoppingDialog);
