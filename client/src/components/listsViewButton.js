import React, { Component } from "react";

import { connect } from "react-redux";
import { toggleShowItems } from "../actions";

import Button from "@material-ui/core/Button";

class ViewButton extends Component {
  state = {
    text: "ADD NEW ITEMS TO LIST"
  };

  handleClick = () => {
    this.setState({
      text:
        this.state.text === "ADD NEW ITEMS TO LIST"
          ? "SHOW ITEMS TO BUY ONLY"
          : "ADD NEW ITEMS TO LIST"
    });
    this.props.showItems();
  };

  render() {
    return (
      <Button color="primary" onClick={this.handleClick}>
        {this.state.text}
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showItems: () => dispatch(toggleShowItems())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ViewButton);
