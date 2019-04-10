import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/index';
import StatisticsTableHead from './StatisticsTableHead';

const styles = () => ({
  root: {
    overflowX: 'auto',
  },
});

class StatisticsTable extends Component {
  static propTypes = {
    onSort: PropTypes.func.isRequired,
    onShowDetails: PropTypes.func.isRequired,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      testAsked: PropTypes.number,
      testCorrect: PropTypes.number,
      testPercentageCorrect: PropTypes.number,
      testWrong: PropTypes.number,
      testPercentageWrong: PropTypes.number,
    })),
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    order: 'asc',
    orderBy: 'id',
    questions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { rowsPerPage, page } = this.state;
    const {
      questions, onSort, orderBy, order, onShowDetails, classes,
    } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, questions.length - (page * rowsPerPage));

    return (
      <div className={classes.root}>
        <Table>
          <StatisticsTableHead
            onRequestSort={onSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {questions.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(n => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={n.id}
              >
                <TableCell padding="none">
                  <Button variant="contained" onClick={() => onShowDetails(n)}>{n.id}</Button>
                </TableCell>
                <TableCell align="right">{n.testAsked}</TableCell>
                <TableCell align="right">{n.testCorrect}</TableCell>
                <TableCell align="right">
                  {n.testPercentageCorrect}
%
                </TableCell>
                <TableCell align="right">{n.testWrong}</TableCell>
                <TableCell align="right">
                  {n.testPercentageWrong}
%
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={questions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(StatisticsTable);
