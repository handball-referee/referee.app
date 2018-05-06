import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
  {
    id: 'id', numeric: false, disablePadding: true, label: 'ID',
  },
  {
    id: 'testAsked', numeric: true, disablePadding: false, label: 'Asked',
  },
  {
    id: 'testCorrect', numeric: true, disablePadding: false, label: 'Correct',
  },
  {
    id: 'testPercentageCorrect', numeric: true, disablePadding: false, label: '% correct',
  },
  {
    id: 'testWrong', numeric: true, disablePadding: false, label: 'Wrong',
  },
  {
    id: 'testPercentageWrong', numeric: true, disablePadding: false, label: '% wrong',
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
