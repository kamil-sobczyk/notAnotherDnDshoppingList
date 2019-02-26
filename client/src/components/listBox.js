import React, { Component } from "react";

import ViewButton from "./listsViewButton";
import ListsContainer from "./listsContainer";
import AddDialog from "./dialogs/addDialog";
import EditDialog from "./dialogs/editDialog";
import DeleteDialog from "./dialogs/deleteDialog";
import ShoppingDialog from './dialogs/shoppingDialog';

class ListBox extends Component {
  render() {
    return (
      <>
        <ViewButton />
        <ListsContainer />
        <AddDialog />
        <EditDialog />
        <DeleteDialog />
        <ShoppingDialog/>
      </>
    );
  }
}

export default ListBox;
