import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { setTitle } from './reducers';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

const store = createStore(setTitle);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
serviceWorker.unregister();
