import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addItem, toggleShowAddDialog } from "../../actions";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import withMobileDialog from "@material-ui/core/withMobileDialog";

import FailDialog from "./failDialog";
import { addNewItem } from "../../functions/apiClient";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class AddDialog extends Component {
  state = {
    item: {
      name: "",
      info: "",
      id: Date.now()
    },
    openFail: false
  };
  handleAddItem = () => {
    const {
      handleAddNewItem,
      handleToggleOpenAddDialog,
      items,
      selected
    } = this.props;

    const allNames = [...selected, ...items].map(({ name }) => name);

    const finishAdding = () => {
      handleAddNewItem(this.state.item);
      addNewItem(handleAddNewItem, this.state.item);
      handleToggleOpenAddDialog();
      this.setState({
        item: {
          name: "",
          info: "",
          id: Date.now()
        }
      });
    };

    console.log("newItem", this.state.item);

    allNames.indexOf(this.state.item.name) < 0
      ? finishAdding()
      : this.setState({ openFail: true });
  };

  toggleOpenFailDialog = () => {
    this.setState({ openFail: !this.state.openFail });
  };

  changeNewItem = e => {
    e.target.name === "info"
      ? this.setState({
          item: {
            info: e.target.value,
            id: Date.now(),
            name: this.state.item.name
          }
        })
      : this.setState({ item: { name: e.target.value, id: Date.now() } });
  };

  render() {
    const {
      classes,
      openAdd,
      handleToggleOpenAddDialog,
      fullScreen
    } = this.props;
    return (
      <Dialog
        open={openAdd}
        fullScreen={fullScreen}
        onClose={this.handleCloseAdd}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Add a new product</DialogTitle>
        <TextField
          required
          id="outlined-required"
          label="New item"
          name="name"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItem}
        />
        <TextField
          id="outlined"
          label="Additional info"
          name="info"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={this.changeNewItem}
        />
        <DialogActions>
          <Button color="primary" onClick={handleToggleOpenAddDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleAddItem}>
            Add
          </Button>
        </DialogActions>
        <FailDialog
          open={this.state.openFail}
          onClose={this.toggleOpenFailDialog.bind(this)}
        />
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  openAdd: PropTypes.bool,
  handleToggleOpenAddDialog: PropTypes.func,
  handleAddItem: PropTypes.func
};

const mapStateToProps = state => {
  return {
    openAdd: state.openAdd,
    items: state.items,
    selected: state.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleToggleOpenAddDialog: () => dispatch(toggleShowAddDialog()),
    handleAddNewItem: item => dispatch(addItem(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobileDialog()(withStyles(styles)(AddDialog)));
