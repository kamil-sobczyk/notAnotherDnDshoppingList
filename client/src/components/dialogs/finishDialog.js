import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { changeSelected, changeItems, addCosts } from "../functions/apiClient";

class FinishDialog extends React.Component {
  state = {
    count: 0
  };

  handleChangeCounter = e => {
    this.setState({
      count: e.target.value,
      date: Date.now()
    });
  };
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
    handleOpenFinish();
    addCosts("!!!!!!!!!!", this.state)
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
        <DialogTitle id="alert-dialog-title">
          {"Finishing shopping"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Check items will be moved to items list. Type how much you spent for
            shopping.
          </DialogContentText>
          <TextField
            id="outlined-number"
            label="Value"
            defaultValue={0}
            onChange={this.handleChangeCounter}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleOpenFinish}>
            Cancel
          </Button>
          <Button color="primary" autoFocus onClick={this.handleFinish}>
            Confirm
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
