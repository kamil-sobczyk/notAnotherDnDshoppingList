import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Items from "./lists/items";
import Selected from "./lists/selected";
import { reorder, move, sortItemsByName } from "../functions/reorderFunctions";
import { changeSelectedOnServer, changeItemsOnServer } from "../functions/apiClient";

import { DragDropContext } from "react-beautiful-dnd";

const styles = theme => ({
  lists: {
    listStyleType: "none",
    width: "100%",
    margin: 0,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center"
  }
});

class ListsContainer extends Component {
  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.props[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;
    const { getItems, getSelected } = this.props;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );
      if (
        JSON.stringify(this.props.items).indexOf(JSON.stringify(items[0])) < 0
      ) {
        getSelected(items);
        changeSelectedOnServer(items);
      }
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      getItems(sortItemsByName(result.droppable));
      getSelected(result.droppable2);

      changeItemsOnServer(result.droppable);
      changeSelectedOnServer(result.droppable2);
    }
  };

  render() {
    const { classes, display } = this.props;

    return (
      <div className={classes.lists}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {display ? <Items /> : false}
          <Selected />
        </DragDropContext>
      </div>
    );
  }
}

ListsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  getItems: PropTypes.func,
  getSelected: PropTypes.func
};

const mapStateToProps = state => {
  return {
    items: state.items,
    selected: state.selected,
    display: state.showItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListsContainer));
