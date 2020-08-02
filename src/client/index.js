import './scss/App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { store, history } from '../store/store';
import App from '../App';

const app = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>
);

ReactDOM.hydrate(app, document.getElementById('react-app'));