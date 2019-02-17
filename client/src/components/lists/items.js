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

import { getItems } from "../data/fetchFunctions";

import { Droppable, Draggable } from "react-beautiful-dnd";

const styles = theme => ({
  root: {
    listStyleType: "none",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center"
  },
  list: {
    width: "30%"
  },
  badge: {
    top: "15%",
    right: "15%",
    width: "40%",
    height: "40%",
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  deleteHover: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: "red"
    }
  },
  infoHover: {
    color: theme.palette.primary.light,
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
    const { classes, items } = this.props;

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
                    <ListItem
                      key={index}
                      role={undefined}
                      dense
                      button
                      // onClick={this.handleToggle(item)}
                    >
                      <ListItemText primary={item.name} secondary={item.info} />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Edit item"
                          // onClick={() => this.handleOpenEdit(index)}
                        >
                          <EditIcon className={classes.infoHover} />
                        </IconButton>
                        <IconButton
                          aria-label="Delete item"
                          // onClick={handleOpenDelete.bind(this, index)}
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

Items.propTypes = {
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
    handleOpenEdit: index =>
      dispatch({ type: "SHOW_EDIT_DIALOG", index: index }),
    handleCheckItem: value => dispatch({ type: "HANDLE_CHECK", value: value }),
    handleOpenDelete: index =>
      dispatch({ type: "SHOW_DELETE_DIALOG", index: index }),
    handleEditItem: index => dispatch({ type: "EDIT_ITEM", index: index }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items));
