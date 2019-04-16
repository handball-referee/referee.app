import React, { FunctionComponent, MouseEvent } from "react";
import { connect } from "react-redux";
import {
  Paper, Typography, WithStyles, createStyles, Theme,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Dispatch } from "redux";
import { withTranslation, WithTranslation } from "react-i18next";
import StatisticsTable from "./StatisticsTable";
import {
  getOrder, getOrderBy, IApplicationState, listStats,
} from "../reducers";
import { IStatsAnswer } from "../model";
import { UIActions } from "../actions/ui";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 3,
  },
});

interface Props extends WithTranslation, WithStyles<typeof styles> {
  order: "asc" | "desc";
  orderBy: keyof IStatsAnswer;
  list: IStatsAnswer[];
  onSort: (event: MouseEvent<HTMLElement>, property: keyof IStatsAnswer) => void;
}

const Statistics: FunctionComponent<Props> = ({
  classes,
  list,
  onSort,
  orderBy,
  order,
  t,
}) => (
  <Paper className={classes.root}>
    <Typography variant="h6" color="inherit">
      {t("Statistics")}
    </Typography>
    <StatisticsTable
      list={list}
      onSort={onSort}
      order={order}
      orderBy={orderBy}
    />
  </Paper>
);

Statistics.defaultProps = {
  list: [],
  order: "asc",
  orderBy: "id",
};

const mapStateToProps = (state: IApplicationState) => ({
  list: listStats(state),
  order: getOrder(state),
  orderBy: getOrderBy(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSort: (event: MouseEvent<HTMLElement>, property: keyof IStatsAnswer) => dispatch(
    UIActions.sort(property),
  ),
});

export default withStyles(styles)(withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistics)));
