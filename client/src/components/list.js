import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Badge from "@material-ui/core/Badge";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import Button from "@material-ui/core/Button";

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

class List extends React.Component {
  state = {
    checked: []
  };
  componentDidMount = () => {
    fetch("/store/", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(store => {
        return this.props.getList(store.list);
      });
    fetch("/store/checked", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(checked => {
        return this.props.getChecked(checked);
      });
  };

  getCh = () => {
    fetch("/store/checked", {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .then(checked => {
        console.log(JSON.stringify(checked));
        // return this.props.getChecked(checked);
      });
  };

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
    
    // this.setState({ checked: newChecked });
    fetch("/store/checked", {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(newChecked)
    })
      .then(response => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then(state => {
        console.log(JSON.stringify(state));
        return state;
      })
      .catch(error => console.log("EERRRRRRRRRRORRRRR ", error));
    handleCheckItem(newChecked);
  };
  render() {
    const { classes, checked, list } = this.props;

    // console.log("ACHTUNG");
    console.log("list", list);
    console.log("checked", checked);

    const shoppingList = list.map((item, index) => (
      <ListItem
        key={index}
        role={undefined}
        dense
        button
        onClick={this.handleToggle(item)}
      >
        <Checkbox
          checked={JSON.stringify(checked).indexOf(JSON.stringify(item)) !== -1}
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

    return (
      <div className={classes.root}>
        {shoppingList}
        <Button onClick={this.getCh}>GET CHECKED</Button>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  openInfo: PropTypes.bool,
  handleOpenInfo: PropTypes.func,
  handleCheckItem: PropTypes.func
};

const mapStateToProps = state => {
  console.log(state);
  console.log(state.checked);

  return { list: state.list, store: state, checked: state.checked };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: index =>
      dispatch({ type: "SHOW_INFO_DIALOG", index: index }),
    handleCheckItem: newChecked =>
      dispatch({ type: "HANDLE_CHECK", newChecked: newChecked }),
    handleDeleteItem: index => dispatch({ type: "DELETE_ITEM", index: index }),
    getList: list => dispatch({ type: "GET_LIST", list: list }),
    getChecked: checked => dispatch({ type: "GET_CHECKED", checked: checked })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(List));
