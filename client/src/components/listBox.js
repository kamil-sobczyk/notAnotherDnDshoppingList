import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import ListsContainer from "./listsContainer";
import AddDialog from "./dialogs/addDialog";
import EditDialog from "./dialogs/editDialog";
import DeleteDialog from "./dialogs/deleteDialog";

class ListBox extends Component {
  render() {
    return (
      <>
        <ListsContainer />
        <AddDialog />
        <EditDialog />
        <DeleteDialog />
        <Button color="primary" onClick={this.props.handleOpenAdd}>
          Add new item
        </Button>
      </>
    );
  }
}

ListBox.propTypes = {
  handleOpenAdd: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenAdd: () => dispatch({ type: "SHOW_ADD_DIALOG" })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ListBox);
