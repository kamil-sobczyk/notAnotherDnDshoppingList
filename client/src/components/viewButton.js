import React, { Component } from "react";

import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

class ViewButton extends Component {
  state = {
    text: "SHOW ITEMS TO BUY ONLY"
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
    showItems: () => dispatch({ type: "SHOW_ITEMS" })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ViewButton);
