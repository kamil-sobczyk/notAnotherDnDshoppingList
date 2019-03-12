import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getItems, toggleShowAddDialog } from "../../actions";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Droppable } from "react-beautiful-dnd";

import DraggableItems from './draggableItems';
import { getItemsFromServer } from "../../functions/apiClient";

const styles = theme => ({
  list: {
    width: "50%",
    maxWidth: 400,
    margin: "5px"
  }
});

class Items extends Component {
  componentDidMount = () => {
    getItemsFromServer(this.props.getItems);
  };

  render() {
    const { classes, items, handleToggleShowAddDialog } = this.props;

    return (
      <Droppable droppableId="droppable">
        {provided => (
          <div ref={provided.innerRef} className={classes.list}>
            <Typography variant="h6" gutterBottom>
              Items to choose
            </Typography>
            {items.map((item, index) => (
              DraggableItems(item, index)
            ))}
            {provided.placeholder}
            <Button color="primary" onClick={handleToggleShowAddDialog}>
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
  getItems: PropTypes.func,
  handleToggleShowAddDialog: PropTypes.func
};

const mapStateToProps = state => {
  return { items: state.items };
};

const mapDispatchToProps = dispatch => {
  return {
    getItems: items => dispatch(getItems(items)),
    handleToggleShowAddDialog: () => dispatch(toggleShowAddDialog())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Items));


