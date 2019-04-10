import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const columnData = [
  {
    id: 'id', align: 'left', disablePadding: true, label: 'ID',
  },
  {
    id: 'testAsked', align: 'right', disablePadding: false, label: 'Asked',
  },
  {
    id: 'testCorrect', align: 'right', disablePadding: false, label: 'Correct',
  },
  {
    id: 'testPercentageCorrect', align: 'right', disablePadding: false, label: '% correct',
  },
  {
    id: 'testWrong', align: 'right', disablePadding: false, label: 'Wrong',
  },
  {
    id: 'testPercentageWrong', align: 'right', disablePadding: false, label: '% wrong',
  },
];

class StatisticsTableHead extends Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  createSortHandler = property => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ), this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default StatisticsTableHead;
