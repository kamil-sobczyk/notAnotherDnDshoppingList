import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Menu from "./menu";

import { Draggable } from "react-beautiful-dnd";

const DraggableItems = (item, index) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem key={index} role={undefined} dense button>
            <ListItemText primary={item.name} secondary={item.info} />
            <Menu index={index} />
          </ListItem>
          <Divider />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItems;
