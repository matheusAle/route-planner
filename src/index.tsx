import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/styles.scss';

import App from './App';

import reportWebVitals from './reportWebVitals';
import { Loader } from './Loader';
import { Provider } from 'react-redux';
import { store } from './store';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Loader>
        <App />
      </Loader>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
