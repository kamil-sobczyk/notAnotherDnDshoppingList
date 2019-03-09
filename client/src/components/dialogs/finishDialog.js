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
import InputAdornment from "@material-ui/core/InputAdornment";
import Slide from "@material-ui/core/Slide";

import { sortItemsByName } from "../../functions/reorderFunctions";
import {
  changeSelected,
  changeItems,
  addCosts
} from "../../functions/apiClient";

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class FinishDialog extends React.Component {
  state = {
    count: 0,
    date: new Date().toLocaleDateString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    chosenItems: []
  };

  handleChangeCounter = e => {
    this.setState({
      count: e.target.value
    });
  };

  handleFinish = () => {
    const {
      handleOpenFinish,
      selected,
      getSelected,
      items,
      getItems,
      getCosts
    } = this.props;
    const newSelected = [];
    let newItems = [];
    const chosenNames = [];

    newItems = items;
    selected.forEach((item, index) => {
      if (item.checked) {
        newItems.push(item);
        chosenNames.push(item.name);
      } else newSelected.push(item);
    });

    const item = this.state;
    item.count = parseInt(this.state.count, 10);
    item.chosenItems = chosenNames;
    sortItemsByName(newItems);

    getSelected(newSelected);
    changeSelected(getSelected, newSelected);
    getItems(newItems);
    changeItems(getItems, newItems);
    addCosts(getCosts, item);
    handleOpenFinish();
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
          {"Finishing shopping"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Checked items will be moved to items list. <br /> Type how much you
            spent for shopping.
          </DialogContentText>
          <TextField
            id="outlined-adornment-number"
            label="Amount"
            defaultValue={0}
            onChange={this.handleChangeCounter}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>
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

FinishDialog.propTypes = {
  items: PropTypes.array,
  getCosts: PropTypes.func,
  getItems: PropTypes.func,
  getSelected: PropTypes.func
};

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getCosts: costs => dispatch({ type: "GET_COSTS", costs: costs })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishDialog);
