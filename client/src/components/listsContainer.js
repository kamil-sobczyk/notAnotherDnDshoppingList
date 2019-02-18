import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Items from "./lists/items";
import Selected from "./lists/selected";

import { DragDropContext } from "react-beautiful-dnd";

import { reorder, move } from "./functions/moveFunctions";
import { changeSelected, changeItems } from "./functions/fetchFunctions";

const styles = theme => ({
  lists: {
    listStyleType: "none",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
  }
});

class ListsContainer extends Component {
  state = {
    items: this.props.items,
    selected: this.props.selected
  };

  componentWillReceiveProps = newProps => {
    if (
      newProps.items !== this.props.items ||
      newProps.selected !== this.props.selected
    ) {
      this.setState({ items: newProps.items, selected: newProps.selected });
    }
  };

  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

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
        JSON.stringify(this.state.items).indexOf(JSON.stringify(items[0])) !==
        -1
      ) {
        changeItems(this.props.getItems, items);
      } else {
        changeSelected(this.props.getSelected, items);
      }
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      changeItems(this.props.getItems, result.droppable);
      changeSelected(this.props.getSelected, result.droppable2);
    }
  };

  render() {
    const { classes, display } = this.props;
    return (
      <div className={classes.lists}>
        <DragDropContext onDragEnd={this.onDragEnd}>
        {display ?  <Items /> : false}
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
  return { items: state.items, store: state, selected: state.selected, display: state.showItems };
};

const mapDispatchToProps = dispatch => {
  return {
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ListsContainer));
