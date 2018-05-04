import 'typeface-roboto';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import primary from 'material-ui/colors/lightGreen';
import secondary from 'material-ui/colors/lime';
import AppShell from './components/AppShell';
import './app.css';

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}

const rootElement = document.getElementById('app');
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[700]
    },
    secondary: {
      main: secondary[500]
    }
  }
});

render((
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </MuiThemeProvider>
), rootElement);
