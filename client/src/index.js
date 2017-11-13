import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from './firebase';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';

ReactDOM.render(
    <BrowserRouter>
        <App firebase={firebase} />
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
