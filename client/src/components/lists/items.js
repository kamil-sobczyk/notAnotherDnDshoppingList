import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import { getItems } from "../functions/apiClient";

import { Droppable, Draggable } from "react-beautiful-dnd";

const styles = theme => ({
  list: {
    width: "45%",
    maxWidth: 400,
    margin: "5px"
  },
  deleteHover: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: "red"
    }
  },
  editHover: {
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
});

class Items extends Component {
  componentWillMount = () => {
    getItems(this.props.getItems);
  };

  render() {
    const { classes, items, handleOpenDelete, handleOpenEdit } = this.props;
    // let sortedItems;

    // if (items) sortedItems = String(items).sort((a, b) => a.name.localCompare(b.name));
   

    return (
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef} className={classes.list}>
            <Typography variant="h6" gutterBottom>
              Items to choose
            </Typography>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItem key={index} role={undefined} dense button>
                      <ListItemText primary={item.name} secondary={item.info} />
                      <ListItemSecondaryAction>
                        <IconButton
                          className={classes.editHover}
                          aria-label="Edit item"
                          onClick={handleOpenEdit.bind(this, {
                            list: "items",
                            index: index
                          })}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete item"
                          onClick={handleOpenDelete.bind(this, {
                            list: "items",
                            index: index
                          })}
                        >
                          <DeleteIcon className={classes.deleteHover} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Button color="primary" onClick={this.props.handleOpenAdd}>
              Add new item
            </Button>
          </div>
        )}
      </Droppable>
    );
  }
}

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  openDelete: PropTypes.bool,
  getItems: PropTypes.func,
  handleOpenDelete: PropTypes.func,
  handleOpenEdit: PropTypes.func,
  handleOpenAdd: PropTypes.func
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
      }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    handleOpenAdd: () => dispatch({ type: "SHOW_ADD_DIALOG" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items));
