// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import { render } from "react-dom";
import App from "./App";
import './index.css'

const rootElement = document.getElementById("root");
render(<App />, rootElement);