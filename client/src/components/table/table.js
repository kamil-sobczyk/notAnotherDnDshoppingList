import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Pagination from "./tablePaginationActions";

import { getCosts } from "../functions/apiClient";

const countMothOutgoings = costs => {
  let sumOfCost;
  const date = new Date().toLocaleDateString();

  if (costs[0]) {
    sumOfCost = costs.reduce((a, b) => {
      // if (a.date[4] === date[4] && b.date[4] === date[4]) {
        return parseInt(a.count) + parseInt(b.count);
      // }
    });
  } console.log(sumOfCost)
  return sumOfCost;
 
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    maxWidth: 500,
    margin: "0 auto"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  title: {
    fontSize: 14
  }
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    costs: []
  };

  componentWillMount = () => {
    getCosts(this.props.getCosts);
  };

  componentWillReceiveProps = newProps => {
    if (newProps.costs !== this.props.costs) {
      this.setState({ costs: newProps.costs });
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value) });
  };

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page, costs } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, costs.length - page * rowsPerPage);

    const sortedCosts = costs.sort((a, b) => a.date > b.date);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Typography variant="h6" gutterBottom>
            Table of your outgoings
          </Typography>
          <Table className={classes.table}>
            <TableBody>
              {sortedCosts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Tooltip
                    disableFocusListener
                    title={row.chosenItems.join(", ")}
                    placement="right"
                    key={index}
                  >
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.date}
                      </TableCell>
                      <TableCell align="right">{row.count + "zł"}</TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={costs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              This month you spent:
            </Typography>
            <Typography variant="h5" component="h2">
              {countMothOutgoings(sortedCosts) + "zł"}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    costs: state.costs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCosts: costs => dispatch({ type: "GET_COSTS", costs: costs })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomPaginationActionsTable));
