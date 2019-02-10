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
  render() {
    const { classes } = this.props;
    return (
      <Dialog open={false} onClose={null}>
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
  )(withStyles(styles)(AddDialog));
  