import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getCosts } from "../../actions";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

import Pagination from "./tablePagination";
import CostsCard from "./costsCard";

import { getCostsFromServer } from "../../functions/apiClient";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    margin: "0 auto"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  title: {
    fontSize: 14
  }
});

class PaginationActionsTable extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
    costs: []
  };

  componentWillMount = () => {
    getCostsFromServer(this.props.getCosts);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: parseInt(event.target.value) });
  };

  render() {
    const { classes, costs } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, costs.length - page * rowsPerPage);

    let sortedCosts;
    if (costs.length > 0) {
      sortedCosts = costs.sort((b, a) => a.date > b.date);
    } else
      sortedCosts = [
        {
          count: 0,
          chosenItems: [null],
          date: "No shopping yet"
        }
      ];

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
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
        <CostsCard sortedCosts={sortedCosts} />
      </Paper>
    );
  }
}

PaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  costs: PropTypes.array,
  getCosts: PropTypes.func
};

const mapStateToProps = state => {
  return {
    costs: state.costs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCosts: costs => dispatch(getCosts(costs))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PaginationActionsTable));