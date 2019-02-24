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

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, handleOpenDelete, handleOpenEdit, index } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <>
      <Tooltip title="More" >
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
          <Tooltip title="Edit" placement="right">
            <IconButton
              className={classes.edit}
              aria-label="Edit item"
              onClick={handleOpenEdit.bind(this, {
                list: "items",
                index: index
              })}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete item"
              onClick={handleOpenDelete.bind(this, {
                list: "items",
                index: index
              })}
            >
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
    handleOpenEdit: PropTypes.func,
  };

const mapStateToProps = state => {
  return { items: state.items, store: state, selected: state.selected };
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
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MoreMenu));
