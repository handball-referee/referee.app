import React, { Component, MouseEvent, ChangeEvent } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles/index";
import StatisticsTableHead from "./StatisticsTableHead";
import { IStatsAnswer } from "../model";

const styles = () => createStyles({
  root: {
    overflowX: "auto",
  },
});

interface Props extends WithStyles<typeof styles> {
  list: IStatsAnswer[];
  order: "asc" | "desc";
  orderBy: keyof IStatsAnswer;
  onSort: (event: MouseEvent<HTMLElement>, property: keyof IStatsAnswer) => void;
}

interface State {
  rowsPerPage: number;
  page: number;
}

class StatisticsTable extends Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    order: "asc",
    orderBy: "id",
    list: [],
  };

  public constructor(props: Props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
    };
  }

  private handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    this.setState({ page });
  };

  private handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  public render() {
    const { rowsPerPage, page } = this.state;
    const {
      list, onSort, orderBy, order, classes,
    } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - (page * rowsPerPage));

    return (
      <div className={classes.root}>
        <Table>
          <StatisticsTableHead
            onRequestSort={onSort}
            order={order}
            orderBy={orderBy}
          />
          <TableBody>
            {list.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={n.id}
              >
                <TableCell padding="none">{n.id}</TableCell>
                <TableCell align="right">{n.testAsked}</TableCell>
                <TableCell align="right">{n.testCorrect}</TableCell>
                <TableCell align="right">
                  {`${n.testPercentageCorrect} %`}
                </TableCell>
                <TableCell align="right">{n.testWrong}</TableCell>
                <TableCell align="right">
                  {`${n.testPercentageWrong} %`}
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
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

export default withStyles(styles)(StatisticsTable);
