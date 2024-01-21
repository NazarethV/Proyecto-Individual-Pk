import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App.jsx' //Todo lo que vamos a renderizar
import { BrowserRouter } from 'react-router-dom'; //LAS RUTAS SE PONEN DENTRO DE ESTE (TODAS LAS RUTAS ESTAN EN App)

import { Provider } from 'react-redux';
import store from './Redux/Store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
