import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { changeSelected, changeItems } from "../functions/apiClient";

class FinishDialog extends React.Component {
  handleFinish = () => {
    const {
      handleOpenFinish,
      selected,
      getSelected,
      items,
      getItems
    } = this.props;

    const newSelected = [];

    let newItems = [];

    if (items) {
      newItems = items;
      selected.forEach(item =>
        item.checked ? newItems.push(item) : newSelected.push(item)
      );
    }

    changeSelected(getSelected, newSelected);
    changeItems(getItems, newItems);

    handleOpenFinish(getItems, newItems);
  };

  render() {
    const { openFinish, handleOpenFinish } = this.props;

    return (
      <Dialog
        open={openFinish}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Shopping finished"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to clear selected items and finnish your shopping?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleOpenFinish}>
            No
          </Button>
          <Button color="primary" autoFocus onClick={this.handleFinish}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishDialog);
