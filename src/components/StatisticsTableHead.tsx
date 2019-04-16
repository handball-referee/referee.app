import React, { Component, MouseEvent } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { IStatsAnswer } from "../model";

interface Props {
  order: "asc" | "desc";
  orderBy: keyof IStatsAnswer;
  onRequestSort: (event: MouseEvent<HTMLElement>, property: keyof IStatsAnswer) => void;
}

interface IColumnData {
  id: keyof IStatsAnswer;
  align: "inherit" | "left" | "center" | "right" | "justify";
  disablePadding: boolean;
  label: string;
}

const columnData: IColumnData[] = [
  {
    id: "id", align: "left", disablePadding: true, label: "ID",
  },
  {
    id: "testAsked", align: "right", disablePadding: false, label: "Asked",
  },
  {
    id: "testCorrect", align: "right", disablePadding: false, label: "Correct",
  },
  {
    id: "testPercentageCorrect", align: "right", disablePadding: false, label: "% correct",
  },
  {
    id: "testWrong", align: "right", disablePadding: false, label: "Wrong",
  },
  {
    id: "testPercentageWrong", align: "right", disablePadding: false, label: "% wrong",
  },
];

class StatisticsTableHead extends Component<Props> {
  private createSortHandler = (property: keyof IStatsAnswer) => (
    event: MouseEvent<HTMLElement>,
  ): void => {
    const { onRequestSort } = this.props;

    onRequestSort(event, property);
  };

  public render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => (
            <TableCell
              key={column.id}
              align={column.align}
              padding={column.disablePadding ? "none" : "default"}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={column.align === "right" ? "bottom-end" : "bottom-start"}
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
