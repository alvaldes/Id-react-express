import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
//local
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth-context';
import reducer from './store/reducer'

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);
