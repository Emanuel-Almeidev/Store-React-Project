import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Header from './components/Header'

import { Provider } from 'react-redux';
import './config/ReactotronConfig'

import { ToastContainer } from 'react-toastify'

import store from './store';

import GlobalStyle from './styles/global'

import './App.css'

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header/>
				<Routes/>
				<GlobalStyle/>
				<ToastContainer autoClose={3000}/>
			</BrowserRouter>
		</Provider>
	);
}

export default App;