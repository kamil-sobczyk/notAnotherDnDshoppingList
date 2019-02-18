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

import { Droppable, Draggable } from "react-beautiful-dnd";

import { getSelected } from "../data/fetchFunctions";

const styles = theme => ({
  list: {
    width: "45%",
    maxWidth: 400
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

class Selected extends Component {
  componentWillMount = () => {
    getSelected(this.props.getSelected);
  };
  render() {
    const { classes, selected, handleOpenDelete, handleOpenEdit } = this.props;

    return (
      <Droppable droppableId="droppable2">
        {provided => (
          <div ref={provided.innerRef} className={classes.list}>
            <Typography variant="h6" gutterBottom>
              Items to buy
            </Typography>
            {selected.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ListItem
                      key={index}
                      role={undefined}
                      dense
                      button
                    >
                      <ListItemText primary={item.name} secondary={item.info} />
                      <ListItemSecondaryAction>
                        <IconButton className={classes.editHover}
                          aria-label="Edit item"
                          onClick={handleOpenEdit.bind(this, {
                            list: "selected",
                            index: index
                          })}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete item"
                          onClick={handleOpenDelete.bind(this, {list: "selected", index: index})}
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
          </div>
        )}
      </Droppable>
    );
  }
}

Selected.propTypes = {
  classes: PropTypes.object.isRequired,
  openInfo: PropTypes.bool,
  openDelete: PropTypes.bool,
  handleOpenInfo: PropTypes.func,
  handleCheckItem: PropTypes.func,
  getItems: PropTypes.func,
  handleEditItem: PropTypes.func
};

const mapStateToProps = state => {
  return { items: state.items, store: state, selected: state.selected };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: index =>
      dispatch({ type: "SHOW_INFO_DIALOG", index: index }),
      handleOpenEdit: activeItem =>
      dispatch({
        type: "SHOW_EDIT_DIALOG",
        index: activeItem.index,
        list: activeItem.list
      }),
    handleCheckItem: value => dispatch({ type: "HANDLE_CHECK", value: value }),
    handleOpenDelete: activeInfo =>
    dispatch({ type: "SHOW_DELETE_DIALOG", index: activeInfo.index, list: activeInfo.list }),
    handleEditItem: index => dispatch({ type: "EDIT_ITEM", index: index }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selected));
