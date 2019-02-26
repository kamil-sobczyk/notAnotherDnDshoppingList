import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const countMothOutgoings = costs => {
  let sumOfCost = 0;

  if (costs.length > 0) {
    costs.forEach(item => (sumOfCost += parseInt(item.count)));
  }
  return sumOfCost;
};

const styles = theme => ({
  title: {
    fontSize: 14
  },
  card: {
      margin: "0 auto"
  }
});

class CostsCard extends Component {
  render() {
    const { classes, sortedCosts } = this.props;
    return (
      <Card >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            This month you spent:
          </Typography>
          <Typography variant="h5" component="h2">
            {countMothOutgoings(sortedCosts) + " zł"}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

CostsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  sortedCosts: PropTypes.array
};

export default withStyles(styles)(CostsCard);
