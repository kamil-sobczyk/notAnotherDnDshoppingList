import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import Slide from "@material-ui/core/Slide";

import Table from "../table/tableContainer";

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class ShoppingDialog extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { fullScreen } = this.props;
    const { open } = this.state;

    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClick}>
          Show previous shoppings
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClick}
          aria-labelledby="shopping-you-made"
          TransitionComponent={Transition}
          keepMounted
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
