import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './components/store';

render(
    <Provider store={store} >
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('Duckweed')
);