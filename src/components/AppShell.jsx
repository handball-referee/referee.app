import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Question from './Question';

const AppShell = () => {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Handball Referee Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Question />
    </div>
  );
};

export default AppShell;
