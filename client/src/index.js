import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { setTitle } from './reducers';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

const store = createStore(setTitle);

ReactDOM.render(
        <Provider store={ store }>
            <App />
        </Provider>, document.getElementById('root'));
serviceWorker.unregister();
