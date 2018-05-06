import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  loading: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
});

const Loading = ({ classes, error }) => {
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <CircularProgress className={classes.loading} />
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.shape({
    loading: PropTypes.string,
  }).isRequired,
  error: PropTypes.instanceOf(Error),
};

Loading.defaultProps = {
  error: null,
};

export default withStyles(styles)(Loading);
