import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import {Provider} from 'react-redux'
import store from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

library.add(fas)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);