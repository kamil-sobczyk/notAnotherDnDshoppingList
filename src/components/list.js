import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Badge from "@material-ui/core/Badge";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import { connect } from "react-redux";

const styles = theme => ({
  root: {
    listStyleType: "none",
    width: "100%",
    maxWidth: 500,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column"
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
    color: "black",
    "&:hover": {
      color: "red"
    }
  },
  infoHover: {
    "&:hover": {
      color: "black"
    }
  }
});

class List extends React.Component {
  handleOpenInfo = i => {
    this.props.handleOpenInfo(i);
  };
  handleDeleteItem = i => {
    this.props.handleDeleteItem(i);
  };
  handleToggle = value => () => {
    const { checked, handleCheckItem } = this.props;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    handleCheckItem(newChecked);
  };
  render() {
    const { list, classes, checked } = this.props;

    const shoppingList = list.map((item, index) => (
      <ListItem
        key={index}
        role={undefined}
        dense
        button
        onClick={this.handleToggle(item)}
      >
        <Checkbox
          checked={checked.indexOf(item) !== -1}
          tabIndex={-1}
          disableRipple
        />
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Info"
            onClick={() => this.handleOpenInfo(index)}
          >
            <Badge
              classes={{ badge: classes.badge }}
              color="primary"
              variant="dot"
              invisible={item.info ? false : true}
            >
              <InfoIcon className={classes.infoHover} />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="Delete"
            onClick={() => this.handleDeleteItem(index)}
          >
            <DeleteIcon className={classes.deleteHover} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    return <div className={classes.root}>{shoppingList}</div>;
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  openInfo: PropTypes.bool,
  handleOpenInfo: PropTypes.func
};

const mapStateToProps = state => {
  return { list: state.list, checked: state.checked };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: i => dispatch({ type: "INFO_DIALOG", index: i }),
    handleCheckItem: newChecked =>
      dispatch({ type: "HANDLE_CHECK", newChecked: newChecked }),
    handleDeleteItem: i => dispatch({ type: "DELETE_ITEM", index: i })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(List));
