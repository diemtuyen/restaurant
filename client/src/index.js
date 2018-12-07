import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import store from './store/store';
import _ from 'lodash';
import httpService from './helpers/httpService';
import { history } from './helpers/history';
import {signalRStart} from './middleware/signalR.middleware';
window.restaurant={};
httpService.setupInterceptors(store,history);
// ReactDOM.render(<App />, document.getElementById('tienhai_app'));
signalRStart(store, () => {
    axios.get('/resources/app.json').then(function(response){
        _.assign(window.restaurant, {
            resuource: response.data
        });
        ReactDOM.render(<App history={history}/>, document.getElementById('tienhai_app'));
    }).catch(error => console.error('Error:', error));
    
}); 
registerServiceWorker();


