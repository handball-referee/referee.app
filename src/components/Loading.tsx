import React, { FunctionComponent } from "react";
import { CircularProgress, Theme, WithStyles } from "@material-ui/core";
import { createStyles, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  loading: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
});

interface Props extends WithStyles<typeof styles> {
  error?: Error|null;
}

const Loading: FunctionComponent<Props> = ({ classes, error }) => {
  if (error) {
    console.log(error); // eslint-disable-line
  }
  return (
    <div>
      <CircularProgress className={classes.loading} />
    </div>
  );
};

Loading.defaultProps = {
  error: null,
};

export default withStyles(styles)(Loading);
