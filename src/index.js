import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './features/store';


// Function to ignore ResizeObserver error
const ignoreResizeObserverError = () => {
  const resizeObserverErrDiv = document.createElement('div');
  const resizeObserverErr = 'ResizeObserver loop limit exceeded';
  window.addEventListener('error', (event) => {
    if (event.message === resizeObserverErr) {
      event.stopImmediatePropagation();
      resizeObserverErrDiv.innerHTML += 'Ignored ResizeObserver error.<br>';
    }
  });
};

// Call the function to ignore ResizeObserver error
ignoreResizeObserverError();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
