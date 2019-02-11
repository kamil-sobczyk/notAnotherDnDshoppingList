import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

import { connect } from "react-redux";

const styles = theme => ({
  root: {
    listStyleType: "none",
    width: "100%",
    maxWidth: 360,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column"
  }
});

class List extends React.Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }
  
  handleOpenInfo = () => {
    this.props.handleOpenInfo();
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
    const { list, classes, handleOpenInfo, checked } = this.props;

    console.log('list in render: ', list);

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
          <IconButton aria-label="Info" onClick={handleOpenInfo}>
            <CommentIcon />
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
  console.log('list in mapStateToProps: ', state.list)
  return { list: state.list, checked: state.checked };
};

const mapDispatchToProps = dispatch => {
  return {
    handleOpenInfo: () => dispatch({ type: "INFO_DIALOG" }),
    handleCheckItem: (newChecked) => dispatch({type: "HANDLE_CHECK", newChecked: newChecked})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(List));
