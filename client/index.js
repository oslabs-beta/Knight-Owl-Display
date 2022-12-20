import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App.jsx";
import styles from './app.css';
import { BrowserRouter } from 'react-router-dom';

const rootDiv = document.getElementById('root');
const root = createRoot(rootDiv);

root.render(
    <React.StrictMode>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </React.StrictMode>
);