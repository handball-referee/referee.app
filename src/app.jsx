import 'typeface-roboto'; // eslint-disable-line import/extensions
import Amplify from 'aws-amplify';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/lightGreen';
import secondary from '@material-ui/core/colors/lime';
import AppShell from './components/AppShell';
import reducer from './reducers/question';
import './app.css';

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}

Amplify.configure({
  Auth: {
    identityPoolId: IDENTITY_POOL_ID,
    region: AWS_REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: WEB_CLIENT_ID,
  },
});

const rootElement = document.getElementById('app');
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary[700],
    },
    secondary: {
      main: secondary[500],
    },
  },
});
const store = createStore(reducer);

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  rootElement,
);
