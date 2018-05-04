import 'typeface-roboto';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppShell from './components/AppShell';
import './app.css';

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
}

const rootElement = document.getElementById('app');

render((
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
), rootElement);
