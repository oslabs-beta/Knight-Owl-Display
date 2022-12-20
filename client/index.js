import React from "react";
// import {createRoot} from "react-dom/client";
import App from "./components/App.jsx";
import styles from './app.css';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Playground, store } from 'graphql-playground-react';


// const rootDiv = document.getElementById('root');
// const root = createRoot(rootDiv);

// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </React.StrictMode>
// );
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.body,
)