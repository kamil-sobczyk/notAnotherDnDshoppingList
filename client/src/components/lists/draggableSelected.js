import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { Draggable } from "react-beautiful-dnd";

const DraggableSelected = (
  item,
  index,
  selected,
  classes,
  handleToggleShowEditDialog,
  handleToggle,
  checkbox
) => (
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
          onClick={handleToggle(index)}
        >
          <Checkbox
            className={checkbox}
            checked={selected[index] ? selected[index].checked : false}
            tabIndex={-1}
            value={"checked"}
            disableRipple
          />
          <ListItemText primary={item.name} secondary={item.info} />

          <Tooltip title="Edit" placement="right">
            <IconButton
              className={classes.editHover}
              aria-label="Edit item"
              onClick={handleToggleShowEditDialog.bind(this, {
                list: "selected",
                index: index,
                id: item.id
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
);

export default DraggableSelected;
