import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import MoreIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  delete: {
    color: theme.palette.primary.main,
    display: "block",
    "&:hover": {
      color: "red"
    }
  },
  edit: {
    display: "block",
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

class MoreMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickMore = action => {
    const { handleOpenEdit, handleOpenDelete, index } = this.props;
    const activeItem = {
      list: "items",
      index: index
    };

    action === "edit" ? handleOpenEdit(activeItem) : handleOpenDelete(activeItem);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <>
        <Tooltip title="More" placement="left">
          <IconButton
            aria-owns={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <Tooltip title="Edit" placement="top">
            <IconButton
              className={classes.edit}
              aria-label="Edit item"
              onClick={this.handleClickMore.bind(this, "edit")}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete item" onClick={this.handleClickMore.bind(this)}>
              <DeleteIcon className={classes.delete} />
            </IconButton>
          </Tooltip>
        </Menu>
      </>
    );
  }
}

MoreMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  openDelete: PropTypes.bool,
  handleOpenDelete: PropTypes.func,
  handleOpenEdit: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenEdit: activeItem =>
      dispatch({
        type: "SHOW_EDIT_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      }),
    handleOpenDelete: activeItem =>
      dispatch({
        type: "SHOW_DELETE_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(MoreMenu));
