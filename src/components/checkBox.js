import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

import List from "./list";

import list from "./data/list";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class CheckboxList extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // checked: PropTypes.boolean,
    openInfo: PropTypes.boolean
    // openAdd: PropTypes.boolean,
    // newItem: PropTypes.object,
    // newItemInfo: PropTypes.string
  };
  state = {
    checked: [],
    // openInfo: false,
    openAdd: false,
    newItem: "",
    newItemInfo: ""
  };

  handleOpenInfo = () => {

  };

  handleCloseInfo = () => {
    this.setState({
      openInfo: false
    });
  };

  handleOpenAddItem = () => {
    this.setState({
      openAdd: true
    });
  };

  handleCloseAdd = () => {
    this.setState({
      openAdd: false
    });
    list.push({
      name: this.state.newItem,
      info: this.state.newItemInfo
    });
  };

  changeNewItem = e => {
    this.setState({ newItem: e.target.value });
  };

  changeNewItemInfo = e => {
    this.setState({ newItemInfo: e.target.value });
  };

  render() {
    const {
      classes,
      checked,
      openInfo,
      openAdd,
      newItem,
      newItemInfo
    } = this.props;

    console.log(this.props.openInfo);

    return (
      <div className={classes.checkList}>
        <List openInfo={this.handleOpenInfo} />
        <Dialog open={openInfo} onClose={this.handleCloseInfo}>
          <DialogTitle>More info</DialogTitle>
          <DialogContent>
            <DialogContentText>Buy in Lidl</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCloseInfo}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openAdd} onClose={this.handleCloseAdd}>
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
        <Button color="primary" onClick={this.handleOpenAddItem}>
          Add new item
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state.openInfo)
  return { openInfo: state.openInfo };
};


const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: () => dispatch({ type: 'INFO' }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CheckboxList));
