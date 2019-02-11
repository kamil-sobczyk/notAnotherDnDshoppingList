import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class AddDialog extends Component {
  state = {
    name: "",
    info: ""
  };
  handleCloseAdd = () => {
    this.props.handleAddItem(this.state);
    this.props.handleOpenAdd();
    this.setState({ name: "", info: "" });
  };

  changeNewItem = e => {
    this.setState({ name: e.target.value });
  };

  changeNewItemInfo = e => {
    this.setState({ info: e.target.value });
  };
  render() {
    const { classes, openAdd } = this.props;
    return (
      <Dialog open={openAdd} onClose={this.handleCloseAdd}>
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          required
          id="outlined-required"
          label="New item"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id="outlined"
          label="Additional info"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItemInfo}
        />
        <DialogActions>
          <Button color="primary" onClick={this.handleCloseAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  openAdd: PropTypes.bool,
  handleOpenAdd: PropTypes.func,
  handleAddItem: PropTypes.func
};

const mapStateToProps = state => {
  return { openAdd: state.openAdd };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenAdd: () => dispatch({ type: "SHOW_ADD_DIALOG" }),
    handleAddItem: newItem => dispatch({ type: "ADD_ITEM", newItem: newItem })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddDialog));
