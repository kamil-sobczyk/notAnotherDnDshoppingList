import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { Droppable, Draggable } from "react-beautiful-dnd";

import { getSelected } from "../../functions/apiClient";
import FinishDialog from "../dialogs/finishDialog";

const styles = theme => ({
  list: {
    width: "50%",
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

class Selected extends Component {
  state = {
    openFinish: false,
    selected: this.props.selected
  };

  componentWillMount = () => {
    getSelected(this.props.getSelected);
  };

  componentWillReceiveProps = newProps => {
    if (newProps.selected !== this.props.selected) {
      this.setState({ selected: newProps.selected });
    }
  };

  handleToggle = index => () => {
    const { selected } = this.props;

    selected[index].checked
      ? (selected[index].checked = false)
      : (selected[index].checked = true);

    this.setState({ selected });
  };

  handleFinishShopping = () => {
    this.setState({
      openFinish: this.state.openFinish ? false : true
    });
  };
  render() {
    const { classes, handleOpenEdit } = this.props;
    const { openFinish, selected } = this.state;

    console.log("selected render")

    return (
      <>
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
                        onClick={this.handleToggle(index)}
                      >
                        <Checkbox
                          checked={
                            selected[index] ? selected[index].checked : false
                          }
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText
                          primary={item.name}
                          secondary={item.info}
                        />

                        <Tooltip title="Edit" placement="right">
                          <IconButton
                            className={classes.editHover}
                            aria-label="Edit item"
                            onClick={handleOpenEdit.bind(this, {
                              list: "selected",
                              index: index
                            })}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </ListItem>
                      <Divider />
                    </div>
                  )}
                </Draggable>
              ))}
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
  handleOpenDelete: PropTypes.func,
  handleOpenEdit: PropTypes.func
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
    getSelected: selected =>
      dispatch({ type: "GET_SELECTED", selected: selected })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Selected));
