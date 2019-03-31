import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getSelected, toggleShowEditDialog } from "../../actions";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Droppable } from "react-beautiful-dnd";

import {
  getSelectedFromServer,
  changeSelectedOnServer
} from "../../functions/apiClient";
import FinishDialog from "../dialogs/finishDialog";
import DraggableSelected from "./draggableSelected";

const styles = theme => ({
  listBig: {
    width: "50%",
    maxWidth: 1000,
    margin: "5px"
  },
  listSmall: {
    width: "50%",
    maxWidth: 500,
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

class Selected extends Component {
  state = {
    openFinish: false
  };

  componentDidMount = () => {
    getSelectedFromServer(this.props.getSelected);
  };

  handleToggle = index => () => {
    const { selected, getSelected } = this.props;

    selected[index].checked
      ? (selected[index].checked = false)
      : (selected[index].checked = true);
    getSelected(selected);
    changeSelectedOnServer(selected);
  };

  handleFinishShopping = () => {
    this.setState({
      openFinish: this.state.openFinish ? false : true
    });
  };
  render() {
    const {
      classes,
      handleToggleShowEditDialog,
      selected,
      display
    } = this.props;
    const { openFinish } = this.state;

    return (
      <>
        <Droppable droppableId="droppable2">
          {provided => (
            <div ref={provided.innerRef} className={display ? classes.listSmall : classes.listBig}>
              <Typography variant="h6" gutterBottom>
                Items to buy
              </Typography>
              {selected.map((item, index) =>
                DraggableSelected(
                  item,
                  index,
                  selected,
                  classes,
                  handleToggleShowEditDialog,
                  this.handleToggle
                )
              )}
              {provided.placeholder}
              <Button color="primary" onClick={this.handleFinishShopping}>
                Finish shopping
              </Button>
            </div>
          )}
        </Droppable>
        <FinishDialog
          openFinish={openFinish}
          handleOpenFinish={this.handleFinishShopping.bind(this)}
          selected={selected}
        />
      </>
    );
  }
}

Selected.propTypes = {
  classes: PropTypes.object.isRequired,
  openDelete: PropTypes.bool,
  getSelected: PropTypes.func,
  handleToggleShowDeleteDialog: PropTypes.func,
  handleToggleShowEditDialog: PropTypes.func,
  display: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    items: state.items,
    store: state,
    selected: state.selected,
    display: state.showItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleToggleShowEditDialog: activeItem =>
      dispatch(toggleShowEditDialog(activeItem)),
    getSelected: selected => dispatch(getSelected(selected))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selected));
