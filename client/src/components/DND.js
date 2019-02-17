import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import Items from "./lists/items";
import Selected from "./lists/selected";

import { DragDropContext } from "react-beautiful-dnd";

import { reorder, move } from "./data/moveFunctions";

import { getItems, getSelected, changeSelected, changeItems } from "./data/fetchFunctions";

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

// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}`,
//         content: `item ${k + offset}`
//     }));

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      selected: this.props.selected
    };
  }

  componentWillReceiveProps = newProps => {
    if (newProps.items !== this.props.items || newProps.selected !== this.props.selected) {
      this.setState({ items: newProps.items, selected: newProps.selected });
    }
  };

  componentDidMount = () => {
    console.log("dnd state", this.state);

    // console.log("this.store", this.store);
    // fetch("/store/", {
    //   mode: "cors",
    //   method: "GET"
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(store => {
    //     return this.props.getItems(store.items);
    //   });
    // fetch("/store/selected", {
    //   mode: "cors",
    //   method: "GET"
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(selected => {
    //     return this.props.getSelected(selected);
    //   });

    // this.setState(
    //   { items: [], selected: [] },
    //   console.log("this.props", this.props)
    // );
  };

  id2List = {
    droppable: "items",
    droppable2: "selected"
  };

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    console.log("result", result);
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

      console.log("items", items);

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      if(JSON.stringify(this.state.items).indexOf(JSON.stringify(items[0])) !== -1) {
        changeItems(this.props.getItems, items);
      }else {
        changeSelected(this.props.getSelected, items);
      }
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      console.log("result", result);

    //   fetch("/store/selected", {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json"
    //     },
    //     mode: "cors",
    //     body: JSON.stringify(result)
    //   })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(items => {
    //       return this.props.getSelected(items);
    //     })
    //   .catch(error => console.log("Ooops", error));
    }
   
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Items />
          <Selected />
        </DragDropContext>
      </div>
    );
  }
}
Lists.propTypes = {
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
    handleEditSelected: selected =>
      dispatch({ type: "EDIT_SELECTED", selected: selected }),
    getItems: items => dispatch({ type: "GET_ITEMS", items: items }),
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Lists));
